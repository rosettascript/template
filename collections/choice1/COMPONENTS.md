# Component Designs - Apphoria Labs Pattern

Visual component patterns for buttons, cards, forms, and UI elements.

---

## 🔘 Button Designs

### Primary Button (`.btn-tech`)

**Visual**: Gradient blue background, glows and scales on hover

```css
.btn-tech {
  background: linear-gradient(135deg, #4A9EFF, #6EB4FF);
  color: #050711;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-tech:hover {
  box-shadow: 0 0 40px rgba(74, 158, 255, 0.3);
  transform: scale(1.05);
}
```

**HTML**:
```html
<button class="btn-tech px-8 py-4">Get Started</button>
```

**Use For**: Primary CTAs, form submissions, main actions

---

### Outline Button (`.btn-tech-outline`)

**Visual**: Blue border, transparent, fills on hover

```css
.btn-tech-outline {
  border: 2px solid #4A9EFF;
  background: transparent;
  color: #4A9EFF;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.btn-tech-outline:hover {
  background: #4A9EFF;
  color: #050711;
  box-shadow: 0 0 40px rgba(74, 158, 255, 0.3);
  transform: scale(1.05);
}
```

**HTML**:
```html
<button class="btn-tech-outline px-6 py-3">Learn More</button>
```

**Use For**: Secondary actions, alternative CTAs, filters

---

### Ghost Button (`.btn-tech-ghost`)

**Visual**: Subtle gray background, soft hover

```css
.btn-tech-ghost {
  background: rgba(13, 20, 39, 0.5);
  color: #F8FAFC;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  transition: all 0.3s;
}

.btn-tech-ghost:hover {
  background: #0D1427;
  box-shadow: 0 8px 32px rgba(5, 7, 17, 0.5);
  transform: scale(1.05);
}
```

**HTML**:
```html
<button class="btn-tech-ghost px-6 py-3">See Work</button>
```

**Use For**: Tertiary actions, less prominent buttons

---

## 🎴 Card Designs

### Tech Card (`.tech-card`)

**Visual**: Gradient background with glow overlay on hover

```css
.tech-card {
  position: relative;
  background: linear-gradient(145deg, #070B1A 0%, #0D1427 100%);
  border: 1px solid #1A2847;
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s;
  backdrop-filter: blur(8px);
}

.tech-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 1rem;
  background: radial-gradient(circle, rgba(74, 158, 255, 0.3) 0%, transparent 70%);
  opacity: 0;
  transition: opacity 0.3s;
}

.tech-card:hover {
  box-shadow: 0 16px 64px rgba(74, 158, 255, 0.2);
  transform: scale(1.05);
}

.tech-card:hover::before {
  opacity: 1;
}
```

**Use For**: Feature cards, service cards, content blocks

---

### Service Card Pattern

**Visual Layout**:
```
┌──────────────────────────────┐
│   ┌────┐                     │
│   │ 🚀 │  64px icon container│
│   └────┘                     │
│                              │
│   Service Title              │ ← text-xl, semibold
│   Short description text     │ ← text-muted-foreground
│                              │
│   ✓ Feature one              │ ← Checkmarks
│   ✓ Feature two              │
│   ✓ Feature three            │
│                              │
│   [React] [Node] [AWS]       │ ← Tech badges
│                              │
│   [Learn More]               │ ← CTA button
└──────────────────────────────┘
```

**HTML**:
```html
<div class="tech-card">
  <!-- Icon Container -->
  <div class="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center mb-4">
    <Icon class="w-8 h-8 text-primary" />
  </div>
  
  <!-- Title -->
  <h3 class="text-xl font-semibold mb-2">Service Title</h3>
  
  <!-- Description -->
  <p class="text-muted-foreground mb-4">
    Short description text explaining the service.
  </p>
  
  <!-- Features -->
  <ul class="space-y-2 mb-4">
    <li class="flex items-center text-sm">
      <CheckIcon class="w-4 h-4 text-primary mr-2" />
      Feature one
    </li>
    <!-- More features... -->
  </ul>
  
  <!-- Tech Badges -->
  <div class="flex flex-wrap gap-2 mb-4">
    <span class="badge-secondary">React</span>
    <span class="badge-secondary">Node</span>
  </div>
  
  <!-- CTA Button -->
  <button class="btn-tech-outline w-full">Learn More</button>
</div>
```

---

### Stat Card Pattern

**Visual**:
```
┌──────────────┐
│              │
│    500+      │ ← Large number (text-4xl, primary)
│  Projects    │ ← Label (muted)
│              │
└──────────────┘
```

**HTML**:
```html
<div class="text-center">
  <div class="text-4xl md:text-5xl font-bold text-primary mb-2">
    500+
  </div>
  <div class="text-muted-foreground">
    Projects Delivered
  </div>
</div>
```

---

## 📱 Form Elements

### Input Field

```css
.input {
  height: 2.5rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #0D1427;
  background: #050711;
  padding: 0.5rem 0.75rem;
  color: #F8FAFC;
}

.input:focus {
  outline: none;
  ring: 2px solid #4A9EFF;
  ring-offset: 2px;
}
```

**HTML**:
```html
<input 
  type="text" 
  class="h-10 w-full rounded-md border border-input bg-background px-3 py-2"
  placeholder="Enter text..."
/>
```

---

### Textarea

**Same styling as input, with**:
```css
min-height: 80px;
resize: vertical;
```

---

### Label

```css
.label {
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
}
```

---

### Select Dropdown

```css
/* Same styling as input with chevron icon */
.select {
  /* Input styles */
  /* Plus dropdown icon on right */
}
```

---

## 🏷️ Badges

### Primary Badge
```css
background: #4A9EFF;
color: #050711;
padding: 0.125rem 0.625rem;
border-radius: 9999px;
font-size: 0.75rem;
font-weight: 600;
```

**HTML**:
```html
<span class="badge-primary">Featured</span>
```

---

### Secondary Badge
```css
background: #0D1427;
color: #F8FAFC;
border: 1px solid #1A2847;
padding: 0.125rem 0.625rem;
border-radius: 9999px;
font-size: 0.75rem;
```

**HTML**:
```html
<span class="badge-secondary">Technology</span>
```

---

### Outline Badge
```css
background: transparent;
border: 1px solid #1A2847;
color: #F8FAFC;
padding: 0.125rem 0.625rem;
border-radius: 9999px;
font-size: 0.75rem;
```

**HTML**:
```html
<span class="badge-outline">React</span>
```

---

## 🎯 Icons

### Icon Sizes
```css
Small:  16px (w-4 h-4)
Medium: 20px (w-5 h-5)
Large:  32px (w-8 h-8)
XLarge: 48px (w-12 h-12)
```

### Icon Colors
```css
Primary:  #4A9EFF  (text-primary)
Accent:   #00FFFF  (text-accent)
Glow:     #6EB4FF  (text-primary-glow)
Muted:    #8B95A9  (text-muted-foreground)
```

### Icon Container - Circle
```html
<div class="w-16 h-16 bg-secondary rounded-full flex items-center justify-center">
  <Icon class="w-8 h-8 text-primary" />
</div>
```

### Icon Container - Square
```html
<div class="w-16 h-16 bg-secondary rounded-xl flex items-center justify-center">
  <Icon class="w-8 h-8 text-accent" />
</div>
```

### Icon Container with Hover
```css
.icon-container {
  transition: transform 0.3s;
}

.icon-container:hover {
  transform: scale(1.1);
}
```

---

## 🎬 Interactive States

### Button States

**Normal**:
```
[Get Started]  ← Gradient blue
```

**Hover**:
```
[Get Started]  ← Glows + scales to 105%
```

**Active/Pressed**:
```
[Get Started]  ← Slightly darker
```

**Disabled**:
```
[Get Started]  ← 50% opacity, no pointer events
```

---

### Card States

**Normal**:
```
┌────────┐
│Content │  ← Standard appearance
└────────┘
```

**Hover**:
```
┌────────┐
│Content │  ← Scales to 105% + glow overlay
│ +glow  │
└────────┘
```

---

---

## 🎨 Navigation Link

```css
.nav-link {
  position: relative;
  padding: 0.5rem 1rem;
  color: rgba(248, 250, 252, 0.8);
  transition: color 0.3s;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #4A9EFF;
  transition: width 0.3s;
}

.nav-link:hover {
  color: #F8FAFC;
}

.nav-link:hover::after {
  width: 100%;
}
```

**Effect**: Underline animates from left to right on hover.

---

## 💫 Loading Spinner

```css
.spinner {
  border-radius: 50%;
  border: 2px solid #080E1D;
  border-top-color: #4A9EFF;
  animation: spin 1s linear infinite;
}
```

---

---

**See Also**: [COLOR_SYSTEM.md](./COLOR_SYSTEM.md) | [LAYOUTS.md](./LAYOUTS.md) | [DESIGN_TOKENS.css](./DESIGN_TOKENS.css)

