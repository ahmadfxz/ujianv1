# Panduan Deploy ke VPS

Panduan lengkap untuk menghosting website Try Out/Lomba Online ke VPS.

## Prasyarat

- VPS dengan OS Ubuntu/Debian (disarankan Ubuntu 20.04 atau lebih baru)
- Akses SSH ke VPS
- Domain (opsional, bisa menggunakan IP)
- Node.js terinstall di VPS (jika ingin menggunakan PM2 untuk static server)

## Metode 1: Deploy sebagai Static Files (Disarankan)

Aplikasi Svelte ini adalah static site, jadi bisa di-host sebagai static files menggunakan Nginx atau Apache.

### Langkah 1: Build Aplikasi

Di komputer lokal Anda:

```bash
# Pastikan semua dependencies terinstall
npm install

# Build aplikasi untuk production
npm run build
```

Setelah build, file akan ada di folder `dist/`

### Langkah 2: Transfer File ke VPS

#### Opsi A: Menggunakan SCP

```bash
# Transfer folder dist ke VPS
scp -r dist/* user@your-vps-ip:/var/www/ujianv1/

# Ganti:
# - user: username VPS Anda
# - your-vps-ip: IP address VPS Anda
# - /var/www/ujianv1/: path tujuan di VPS
```

#### Opsi B: Menggunakan Git (Disarankan)

1. **Buat repository Git** (GitHub/GitLab/Bitbucket)

2. **Push kode ke repository:**

```bash
# Inisialisasi git (jika belum)
git init
git add .
git commit -m "Initial commit"

# Tambahkan remote repository
git remote add origin https://github.com/username/ujianv1.git
git push -u origin main
```

3. **Di VPS, clone dan setup:**

```bash
# SSH ke VPS
ssh user@your-vps-ip

# Install Node.js (jika belum)
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install Nginx
sudo apt update
sudo apt install nginx -y

# Clone repository
cd /var/www
sudo git clone https://github.com/username/ujianv1.git
cd ujianv1

# Install dependencies dan build
sudo npm install
sudo npm run build
```

### Langkah 3: Setup Nginx

1. **Buat konfigurasi Nginx:**

```bash
sudo nano /etc/nginx/sites-available/ujianv1
```

2. **Tambahkan konfigurasi berikut:**

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;  # Ganti dengan domain Anda, atau IP untuk testing
    
    root /var/www/ujianv1/dist;
    index index.html;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

3. **Aktifkan site:**

```bash
# Buat symlink
sudo ln -s /etc/nginx/sites-available/ujianv1 /etc/nginx/sites-enabled/

# Test konfigurasi
sudo nginx -t

# Restart Nginx
sudo systemctl restart nginx
```

### Langkah 4: Setup Firewall (jika perlu)

```bash
# Allow HTTP
sudo ufw allow 'Nginx Full'
# atau
sudo ufw allow 80
sudo ufw allow 443
```

### Langkah 5: Setup SSL dengan Let's Encrypt (Opsional tapi Disarankan)

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx -y

# Setup SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Auto-renewal sudah diatur otomatis
```

## Metode 2: Menggunakan PM2 untuk Static Server

Jika ingin menggunakan Node.js server:

1. **Install PM2:**

```bash
npm install -g pm2
```

2. **Install serve:**

```bash
npm install -g serve
```

3. **Jalankan dengan PM2:**

```bash
cd /var/www/ujianv1
pm2 serve dist 3000 --spa --name ujianv1
pm2 save
pm2 startup
```

4. **Setup Nginx sebagai reverse proxy:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Update Aplikasi

Setelah melakukan perubahan, update aplikasi di VPS:

```bash
# SSH ke VPS
ssh user@your-vps-ip

# Masuk ke folder aplikasi
cd /var/www/ujianv1

# Pull perubahan terbaru (jika menggunakan Git)
git pull

# Install dependencies baru (jika ada)
npm install

# Rebuild aplikasi
npm run build

# Restart Nginx (jika menggunakan Nginx)
sudo systemctl restart nginx

# Atau restart PM2 (jika menggunakan PM2)
pm2 restart ujianv1
```

## Troubleshooting

### Error 404 pada route

Pastikan konfigurasi Nginx menggunakan `try_files $uri $uri/ /index.html;` untuk SPA routing.

### Permission denied

```bash
# Set ownership yang benar
sudo chown -R www-data:www-data /var/www/ujianv1
sudo chmod -R 755 /var/www/ujianv1
```

### Nginx tidak start

```bash
# Check error log
sudo tail -f /var/log/nginx/error.log

# Test konfigurasi
sudo nginx -t
```

### Port sudah digunakan

```bash
# Check port yang digunakan
sudo netstat -tulpn | grep :80
```

## Struktur File di VPS

```
/var/www/ujianv1/
├── dist/              # File build (di-serve oleh Nginx)
│   ├── index.html
│   ├── assets/
│   └── ...
├── src/               # Source code (opsional, untuk update)
├── package.json
└── ...
```

## Catatan Penting

1. **Static Files**: Aplikasi Svelte ini adalah static site, jadi tidak perlu backend server untuk hosting dasar.

2. **API Backend**: Jika nantinya perlu backend API untuk autentikasi dan data real, Anda perlu setup backend server terpisah (Node.js, Python, dll).

3. **Environment Variables**: Jika menggunakan environment variables, pastikan setup dengan benar di VPS.

4. **Security**: 
   - Gunakan HTTPS (SSL)
   - Setup firewall
   - Update sistem secara berkala
   - Gunakan SSH key authentication

5. **Backup**: Selalu backup file dan database secara berkala.

## Quick Start Script

Anda bisa membuat script untuk memudahkan deployment:

```bash
#!/bin/bash
# deploy.sh

echo "Building application..."
npm run build

echo "Copying files to VPS..."
scp -r dist/* user@your-vps-ip:/var/www/ujianv1/

echo "Restarting Nginx..."
ssh user@your-vps-ip "sudo systemctl restart nginx"

echo "Deployment complete!"
```

Gunakan dengan:
```bash
chmod +x deploy.sh
./deploy.sh
```

---

Selamat deploy! 🚀