# 🚀 3D Expense Tracker

A stunning, professional expense tracking application with beautiful 3D effects, glassmorphism design, and advanced animations. Built with vanilla HTML, CSS, and JavaScript.

![3D Expense Tracker](https://img.shields.io/badge/Status-Complete-brightgreen)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

## ✨ Features

### 🎨 Visual Design
- **3D Glassmorphism Effects** - Beautiful glass-like cards with depth and transparency
- **Animated Gradient Backgrounds** - Dynamic, shifting color gradients
- **Floating Geometric Shapes** - Animated background elements for visual interest
- **Smooth Transitions** - Cubic-bezier animations for premium feel
- **Responsive Design** - Perfect on all devices from mobile to desktop

### 🎯 Core Functionality
- **Add Expenses** - Quick and easy expense entry with validation
- **Real-time Statistics** - Total spent, expense count, and average expense
- **Category Management** - Organized with icons (Food, Transport, Shopping, etc.)
- **Local Storage** - Persistent data storage in browser
- **Delete & Clear** - Remove individual expenses or clear all

### 🎭 Advanced Interactions
- **Parallax Cursor** - Interactive cursor that follows mouse movement
- **Hover Effects** - Cards lift and transform on hover
- **Ripple Animations** - Button click effects for tactile feedback
- **Notification System** - Beautiful toast notifications
- **Loading States** - Smooth loading animations

### ♿ Accessibility
- **Screen Reader Support** - ARIA labels and live regions
- **Keyboard Navigation** - Full keyboard support with shortcuts
- **Skip Links** - Jump to main content
- **Focus Management** - Clear focus indicators
- **High Contrast Mode** - Supports high contrast preferences
- **Reduced Motion** - Respects user motion preferences

### ⚡ Performance
- **Optimized Animations** - RequestAnimationFrame for smooth performance
- **Debounced Events** - Efficient event handling
- **Performance Metrics** - Built-in performance monitoring
- **Browser Compatibility** - Works across all modern browsers

## 🚀 Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/3d-expense-tracker.git
   cd 3d-expense-tracker
   ```

2. **Open in browser**
   ```bash
   # Simply open index.html in your browser
   # Or use a local server:
   npx serve .
   # Or with Python:
   python -m http.server 8000
   ```

3. **Start tracking expenses!**
   - Fill in expense details
   - Choose a category
   - Click "Add Expense"
   - Watch your beautiful 3D expense tracker come to life!

## 🎮 Keyboard Shortcuts

- **Ctrl + Enter** - Focus on expense name input
- **Escape** - Close all notifications
- **Ctrl + Shift + Delete** - Clear all expenses
- **Tab** - Navigate through form elements

## 🎨 Customization

### Colors
The color scheme uses CSS custom properties and can be easily modified:
- Primary: `#667eea` (Purple Blue)
- Secondary: `#764ba2` (Purple)
- Accent: `#f093fb` (Pink)
- Background: Dynamic gradient

### Categories
Add new expense categories by modifying the `categoryIcons` object in `script.js`:
```javascript
const categoryIcons = {
    food: '🍔',
    transport: '🚗',
    shopping: '🛍️',
    // Add your categories here
    travel: '✈️',
    pets: '🐕'
};
```

## 📱 Browser Support

- ✅ Chrome 80+
- ✅ Firefox 75+
- ✅ Safari 13+
- ✅ Edge 80+
- ✅ Opera 70+

## 🔧 Technical Details

### Architecture
- **HTML5** - Semantic markup with accessibility features
- **CSS3** - Modern features like Grid, Flexbox, backdrop-filter
- **Vanilla JavaScript** - No frameworks, pure ES6+
- **LocalStorage** - Client-side data persistence

### Key CSS Features
- CSS Grid for layout
- Flexbox for component alignment
- CSS transforms for 3D effects
- Backdrop-filter for glassmorphism
- CSS animations and transitions
- Custom properties for theming

### JavaScript Features
- ES6+ modern syntax
- RequestAnimationFrame for smooth animations
- Intersection Observer for scroll animations
- Event delegation for performance
- LocalStorage for data persistence

## 🎯 Project Structure

```
3d-expense-tracker/
├── index.html          # Main HTML file
├── style.css           # Comprehensive CSS with 3D effects
├── script.js           # JavaScript functionality
├── README.md           # This file
```

## 🛠️ Development

### Adding New Features
1. **New Statistics** - Add to `updateStats()` function
2. **New Categories** - Update `categoryIcons` object
3. **New Animations** - Add CSS keyframes and apply classes
4. **New Interactions** - Add event listeners in `setupEventListeners()`

### Performance Optimization
- Use `requestAnimationFrame` for animations
- Debounce expensive operations
- Use CSS `will-change` property sparingly
- Optimize images and assets

## 🎉 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- **Font Awesome** - For beautiful icons
- **Google Fonts** - For the Poppins font family
- **CSS Tricks** - For glassmorphism inspiration
- **MDN Web Docs** - For comprehensive web standards documentation

## 📊 Stats

- **Lines of CSS:** 1,500+
- **JavaScript Functions:** 20+
- **Animation Keyframes:** 15+
- **Accessibility Features:** 10+
- **Browser Compatibility:** 95%+

---

Made with ❤️ and lots of ☕

*Experience the future of expense tracking with beautiful 3D effects and premium animations!*
