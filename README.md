# Manual de Utilizare - Totem Digital Romania

Manual web responsive, printabil A4 și descărcabil pentru echipamentele Totem Digital Romania.

## 🚀 Caracteristici

- ✅ **Responsive Design** - Funcționează perfect pe desktop, tabletă și mobile
- ✅ **Printabil A4** - Optimizat pentru printare pe format A4
- ✅ **Descărcabil PDF** - Posibilitate de descărcare ca PDF
- ✅ **Navigație intuitivă** - Meniu lateral și căutare
- ✅ **Tabele responsive** - Tabele care se adaptează pe orice ecran
- ✅ **Imagini responsive** - Imagini optimizate pentru toate dispozitivele
- ✅ **Design modern** - Interfață curată și profesională

## 📁 Structura Fișierelor

```
manual-totem-digital/
├── index.html          # Pagina principală cu conținutul complet
├── styles.css          # Stiluri pentru ecran (responsive)
├── print.css           # Stiluri pentru printare A4
├── script.js           # Funcționalități JavaScript
└── README.md           # Acest fișier
```

## 🎯 Utilizare

### Vizualizare în Browser

1. Deschideți fișierul `index.html` în orice browser modern
2. Folosiți meniul lateral pentru navigare rapidă
3. Utilizați caseta de căutare pentru a găsi informații specifice

### Printare

1. Click pe butonul **"Printează"** din header sau folosiți `Ctrl + P` (Windows) / `Cmd + P` (Mac)
2. Selectați "Salvează ca PDF" pentru a salva fișierul
3. Documentul va fi formatat automat pentru A4

### Descărcare PDF

1. Click pe butonul **"Descarcă PDF"** din header
2. Fișierul va fi generat și descărcat automat
3. *Notă: Pentru funcționalitatea completă de descărcare PDF, includeți biblioteca html2pdf.js (vezi mai jos)*

## 🛠️ Funcționalități Tehnice

### Responsive Design
- **Mobile First** - Optimizat pentru dispozitive mobile
- **Breakpoints**: 1024px (tablet), 768px (mobile), 480px (small mobile)
- **Touch-friendly** - Butoane și elemente optimizate pentru touch

### Printare A4
- Format automat A4 portrait
- Marginile: 2cm (top/bottom), 1.5cm (left/right)
- Page breaks inteligente
- Elemente non-printabile ascunse automat

### JavaScript Features
- Smooth scrolling
- Search functionality
- Active navigation highlighting
- Back to top button
- Mobile menu toggle
- Lazy loading pentru imagini

## 📦 Opțional: Adăugare Librărie PDF

Pentru funcționalitatea completă de descărcare PDF, adăugați în `<head>` din `index.html`:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>
```

Sau descărcați local biblioteca de pe: https://github.com/eKoopmans/html2pdf.js

## 🎨 Personalizare

### Culori
Modificați variabilele CSS din `styles.css`:

```css
:root {
    --primary-color: #2563eb;
    --secondary-color: #64748b;
    --success-color: #10b981;
    --warning-color: #f59e0b;
    --danger-color: #ef4444;
}
```

### Logo-uri
Înlocuiți placeholder-ele din secțiunea cover page cu logo-uri reale:

```html
<div class="cover-logos">
    <img src="path/to/logo1.png" alt="Logo 1">
    <img src="path/to/logo2.png" alt="Logo 2">
</div>
```

### Imagini
Adăugați imagini în document prin înlocuirea placeholder-elor sau adăugând noi imagini:

```html
<img src="path/to/image.jpg" alt="Descriere imagine" loading="lazy">
```

## 🌐 Publicare pe Website

### Opțiunea 1: Host Static
Încărcați toate fișierele (HTML, CSS, JS) pe server-ul dvs. web.

### Opțiunea 2: GitHub Pages
1. Creați un repository pe GitHub
2. Încărcați fișierele
3. Activați GitHub Pages în Settings
4. Accesați la `https://username.github.io/repository-name`

### Opțiunea 3: Netlify/Vercel
1. Conectați repository-ul GitHub
2. Deploy automat la fiecare commit
3. URL gratuit și SSL inclus

## 📱 Compatibilitate Browser

- ✅ Chrome/Edge (versiunea curentă)
- ✅ Firefox (versiunea curentă)
- ✅ Safari 12+
- ✅ Opera (versiunea curentă)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Tehnologii Utilizate

- **HTML5** - Structură semantică
- **CSS3** - Flexbox, Grid, Custom Properties
- **JavaScript (Vanilla)** - Fără dependințe externe
- **Print CSS** - Media queries pentru printare

## 📞 Contact & Support

**Totem Digital Romania**
- Website: www.totemdigital.ro | www.info-kiosk.ro
- Tel: +40 371 710 077
- Email: sales@totemdigital.ro

## 📄 Licență

© 2020-2025 Totem Digital Romania. Toate drepturile rezervate.
Document în proprietatea Office Conect SRL.

---

**Versiune:** 2.2  
**Ultima actualizare:** 2025  
**Creat cu:** ❤️ pentru Totem Digital Romania
