# Color System - Apphoria Labs Pattern

Modern dark blue theme with tech aesthetics and glowing effects.

---

## 🎨 Color Palette

### Primary Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| Primary Blue | `#4A9EFF` | `hsl(217, 91%, 60%)` | Main brand, CTAs, links |
| Primary Glow | `#6EB4FF` | `hsl(217, 91%, 70%)` | Glow effects, highlights |
| Accent Cyan | `#00FFFF` | `hsl(180, 100%, 50%)` | Accents, special highlights |

### Background Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| Background | `#050711` | `hsl(220, 50%, 3%)` | Main page background |
| Card | `#070B1A` | `hsl(220, 50%, 5%)` | Card backgrounds |
| Secondary | `#0D1427` | `hsl(220, 50%, 8%)` | Secondary elements |
| Muted | `#080E1D` | `hsl(220, 50%, 6%)` | Muted backgrounds |
| Border | `#1A2847` | `hsl(220, 50%, 12%)` | Borders, dividers |
| Input | `#0D1427` | `hsl(220, 50%, 8%)` | Form inputs |

### Text Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| Foreground | `#F8FAFC` | `hsl(210, 40%, 98%)` | Primary text |
| Muted Text | `#8B95A9` | `hsl(215, 20%, 65%)` | Secondary text, labels |

### Status Colors

| Color | Hex | HSL | Usage |
|-------|-----|-----|-------|
| Destructive | `#F24E4E` | `hsl(0, 84%, 60%)` | Errors, warnings |

---

## 🎨 Gradients

### Primary Gradient
```css
linear-gradient(135deg, #4A9EFF, #6EB4FF)
```
**Usage**: Buttons, icon containers, highlights

### Hero Gradient
```css
linear-gradient(135deg, 
  rgba(5,7,17,0.8) 0%, 
  rgba(74,158,255,0.1) 50%, 
  rgba(5,7,17,0.8) 100%
)
```
**Usage**: Hero section backgrounds

### Card Gradient
```css
linear-gradient(145deg, #070B1A 0%, #0D1427 100%)
```
**Usage**: Card backgrounds, subtle depth

### Text Gradient
```css
linear-gradient(135deg, #A8CAFF, #8FFFFF)
-webkit-background-clip: text
-webkit-text-fill-color: transparent
```
**Usage**: Hero titles, special headings

### Glow Gradient
```css
radial-gradient(circle at center, 
  rgba(74,158,255,0.3) 0%, 
  transparent 70%
)
```
**Usage**: Hover overlays, emphasis areas

---

## 🌟 Shadows

### Card Shadow
```css
box-shadow: 0 8px 32px rgba(5, 7, 17, 0.5);
```
**Usage**: Elevated cards, depth

### Glow Shadow
```css
box-shadow: 0 0 40px rgba(74, 158, 255, 0.3);
```
**Usage**: Buttons on hover, interactive elements

### Hover Shadow
```css
box-shadow: 0 16px 64px rgba(74, 158, 255, 0.2);
```
**Usage**: Cards on hover, emphasis

---

## 🎯 Color Combinations

### High Contrast (Primary CTA)
```css
Background: #4A9EFF
Text:       #050711
Border:     none
```

### Medium Contrast (Cards)
```css
Background: #070B1A
Text:       #F8FAFC
Border:     #1A2847
```

### Low Contrast (Muted)
```css
Background: #0D1427
Text:       #8B95A9
Border:     #1A2847
```

---

## 💫 Glow Effects

### Blue Glow
```css
.glow-blue {
  filter: drop-shadow(0 0 20px rgba(74, 158, 255, 0.4));
}
```

### Cyan Glow
```css
.glow-cyan {
  filter: drop-shadow(0 0 20px rgba(0, 255, 255, 0.4));
}
```

### Pulse Glow
```css
@keyframes pulse-glow {
  from { box-shadow: 0 0 20px rgba(74, 158, 255, 0.4); }
  to { box-shadow: 0 0 40px rgba(74, 158, 255, 0.8); }
}
.pulse-glow {
  animation: pulse-glow 2s ease-in-out infinite alternate;
}
```

---

## 🎨 CSS Variables

### Using in Your Project

```css
:root {
  /* Primary */
  --primary: 217 91% 60%;
  --primary-foreground: 220 50% 3%;
  --primary-glow: 217 91% 70%;
  
  /* Accent */
  --accent: 180 100% 50%;
  --accent-foreground: 220 50% 3%;
  
  /* Backgrounds */
  --background: 220 50% 3%;
  --foreground: 210 40% 98%;
  --card: 220 50% 5%;
  --secondary: 220 50% 8%;
  --muted: 220 50% 6%;
  --muted-foreground: 215 20% 65%;
  
  /* UI Elements */
  --border: 220 50% 12%;
  --input: 220 50% 8%;
  --ring: 217 91% 60%;
  
  /* Gradients */
  --gradient-primary: linear-gradient(135deg, hsl(217, 91%, 60%), hsl(237, 91%, 70%));
  --gradient-card: linear-gradient(145deg, hsl(220, 50%, 5%), hsl(220, 50%, 8%));
  --gradient-glow: radial-gradient(circle, hsl(217, 91%, 60%, 0.3) 0%, transparent 70%);
  
  /* Shadows */
  --shadow-card: 0 8px 32px hsl(220, 50%, 3%, 0.5);
  --shadow-glow: 0 0 40px hsl(217, 91%, 60%, 0.3);
  --shadow-hover: 0 16px 64px hsl(217, 91%, 60%, 0.2);
}
```

---

## 🎨 Color Usage Guidelines

### Primary Blue (`#4A9EFF`)
- Main action buttons
- Links and interactive elements
- Navigation highlights
- Focus states
- Brand elements

### Accent Cyan (`#00FFFF`)
- Secondary CTAs
- Hover effects
- Special highlights
- Decorative elements

### Backgrounds
- `#050711` - Main page background
- `#070B1A` - Card backgrounds
- `#0D1427` - Secondary sections, icon containers
- `#080E1D` - Muted elements

### Text
- `#F8FAFC` - Primary text, headings
- `#8B95A9` - Secondary text, descriptions, labels

---

## 🌈 Accessibility

**Contrast Ratios**:
- Primary Blue on Dark: 8.2:1 ✅ (AAA)
- White Text on Dark: 15.1:1 ✅ (AAA)
- Muted Text on Dark: 4.8:1 ✅ (AA)
- Primary Blue Text: 4.5:1 ✅ (AA)

---

## 🎨 Color Application Examples

### Navigation
```css
background: rgba(5, 7, 17, 0.8);  /* Semi-transparent dark */
border-bottom: 1px solid #1A2847;
backdrop-filter: blur(12px);
```

### Button
```css
background: linear-gradient(135deg, #4A9EFF, #6EB4FF);
color: #050711;
box-shadow: 0 0 40px rgba(74, 158, 255, 0.3); /* on hover */
```

### Card
```css
background: linear-gradient(145deg, #070B1A, #0D1427);
border: 1px solid #1A2847;
box-shadow: 0 16px 64px rgba(74, 158, 255, 0.2); /* on hover */
```

### Input
```css
background: #050711;
border: 1px solid #0D1427;
color: #F8FAFC;
ring: 2px solid #4A9EFF; /* on focus */
```

---

## 🎨 Gradient Text Effect

```css
.hero-title {
  background: linear-gradient(135deg, #A8CAFF, #8FFFFF);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

Result: Beautiful gradient text for hero titles.

---

## 📐 Grid Pattern Background

```css
.tech-grid {
  background-image: 
    linear-gradient(rgba(74, 158, 255, 0.1) 1px, transparent 1px),
    linear-gradient(90deg, rgba(74, 158, 255, 0.1) 1px, transparent 1px);
  background-size: 50px 50px;
}
```

Creates a subtle tech-style grid pattern overlay.

---

## 🎨 Implementation Tips

### Do's ✅
- Use primary blue for main actions
- Apply glow effects to interactive elements
- Maintain consistent border radius (0.75rem)
- Use gradient backgrounds for depth
- Add smooth transitions (0.3s)

### Don'ts ❌
- Don't overuse glow effects
- Avoid low contrast text
- Don't mix too many different blues
- Avoid harsh transitions
- Don't skip hover states

---

**For Complete CSS**: See [DESIGN_TOKENS.css](./DESIGN_TOKENS.css)  
**For Components**: See [COMPONENTS.md](./COMPONENTS.md)  
**For Layouts**: See [LAYOUTS.md](./LAYOUTS.md)

