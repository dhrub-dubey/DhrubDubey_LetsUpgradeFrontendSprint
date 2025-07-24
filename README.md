<<<<<<< HEAD
# Aesthetic Cakes - Static Website

A beautiful, responsive website for Aesthetic Cakes bakery, built with HTML, CSS, and JavaScript. Perfect for GitHub Pages hosting.

## Features

- **Responsive Design**: Works perfectly on all devices
- **Interactive Cart**: Add/remove items with quantity management
- **Product Search**: Real-time search functionality
- **Product Details**: Detailed modals with nutritional information
- **Contact Form**: EmailJS integration for contact submissions
- **Smooth Animations**: Beautiful hover effects and transitions
- **Modern UI**: Clean, aesthetic design with Tailwind CSS

## Sections

1. **Hero Section**: Eye-catching introduction with call-to-action
2. **About Section**: Story and mission of Aesthetic Cakes
3. **Featured Creations**: Showcase of popular items
4. **Portfolio**: Complete cake collection with filtering
5. **Sweeties**: Brownies, cookies, and other treats
6. **Contact**: Contact information and form

## Technologies Used

- HTML5
- CSS3 (with Tailwind CSS via CDN)
- Vanilla JavaScript
- Lucide Icons
- EmailJS for contact form
- Google Fonts (Playfair Display & Inter)

## Setup for GitHub Pages

1. **Fork or Download** this repository
2. **Upload your assets**:
   - Replace `assets/aesthetic-cakes-logo.png` with your logo
   - Replace `assets/mangomousse.png` with your mango mousse image
3. **Configure EmailJS** (optional):
   - Sign up at [EmailJS](https://www.emailjs.com/)
   - Replace the placeholder keys in `script.js`:
     ```javascript
     emailjs.init('your_actual_public_key');
     // And in the sendForm function:
     await emailjs.sendForm('your_service_id', 'your_template_id', contactForm);
     ```
4. **Enable GitHub Pages**:
   - Go to your repository settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Save and wait for deployment

## Customization

### Adding New Products

Edit the `cakes` or `sweeties` arrays in `script.js`:

```javascript
const cakes = [
    {
        id: 1,
        name: "Your Cake Name",
        description: "Description here",
        price: "Rs. 1000.00",
        image: "https://your-image-url.com",
        category: "Category",
        isVeg: true,
        // ... other properties
    }
];
```

### Changing Colors

The website uses a pink color scheme. To change colors, update the Tailwind classes:
- `text-pink-600` for primary text color
- `bg-pink-600` for primary background color
- `border-pink-600` for borders
- `hover:text-pink-600` for hover states

### Modifying Sections

Each section has its own HTML block in `index.html`. You can:
- Edit text content directly
- Change images by updating `src` attributes
- Modify layout by adjusting Tailwind classes

## File Structure

```
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styles
├── script.js           # JavaScript functionality
├── assets/
│   ├── aesthetic-cakes-logo.png
│   └── mangomousse.png
└── README.md           # This file
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized images from Unsplash
- Minimal JavaScript bundle
- CSS animations for smooth interactions
- Lazy loading for better performance

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For questions or support, please contact [dhrubdubey5997@gmail.com](mailto:dhrubdubey5997@gmail.com).

---

Made with ❤️ for Aesthetic Cakes
=======
# DhrubDubey_LetsUpgradeFrontendSprint
>>>>>>> d76b5b785f7b96d5b242d52511ac0c0fb5041d8d
