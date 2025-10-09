# Layout Patterns - Apphoria Labs Pattern

Page layouts, sections, and responsive grid systems.

---

## 🎯 Hero Section

### Full Viewport Hero

**Visual**:
```
┌──────────────────────────────────────────┐
│  [Background Image + Gradient Overlay]   │
│  [Animated Grid Pattern]                 │
│  [Floating Elements: ○ □ ◇]             │
│                                          │
│      Building Smart, Scalable,           │ ← Gradient text
│      Secure Solutions                    │   (4xl-7xl)
│                                          │
│  Transform your business with cutting-   │ ← Subtitle
│  edge technology solutions.              │   (xl, muted)
│                                          │
│  [Primary] [Outline] [Ghost]             │ ← 3 Buttons
│                                          │
│           ↓                              │ ← Scroll indicator
└──────────────────────────────────────────┘
```

**HTML Structure**:
```html
<section class="relative min-h-screen flex items-center justify-center overflow-hidden">
  <!-- Background -->
  <div class="absolute inset-0">
    <img src="hero-bg.jpg" class="w-full h-full object-cover opacity-30" />
    <div class="absolute inset-0 tech-grid opacity-20"></div>
    <div class="absolute inset-0 bg-gradient-hero"></div>
  </div>
  
  <!-- Floating Decorative Elements -->
  <div class="absolute top-20 left-10 w-20 h-20 border border-primary/30 rounded-full float glow-blue"></div>
  <div class="absolute top-40 right-20 w-16 h-16 border border-accent/30 rounded-lg float" 
       style="animation-delay: 1s"></div>
  
  <!-- Content -->
  <div class="relative z-10 text-center max-w-6xl mx-auto px-4">
    <h1 class="hero-title mb-6 leading-tight">
      Building Smart, Scalable,<br>
      <span class="text-accent">Secure Solutions</span>
    </h1>
    
    <p class="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
      Transform your business with cutting-edge technology solutions.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="btn-tech px-8 py-4">Get Started</button>
      <button class="btn-tech-outline px-8 py-4">Learn More</button>
      <button class="btn-tech-ghost px-8 py-4">See Work</button>
    </div>
  </div>
  
  <!-- Scroll Indicator -->
  <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
    <div class="w-6 h-10 border-2 border-primary rounded-full flex justify-center">
      <div class="w-1 h-3 bg-primary rounded-full mt-2"></div>
    </div>
  </div>
</section>
```

---

## 📐 Content Sections

### Standard Section

**Pattern**:
```
Max width: 1280px (max-w-7xl)
Vertical padding: 5rem (py-20)
Horizontal padding: 1rem mobile, 1.5rem tablet, 2rem desktop
Background: Alternates between transparent and card/30
```

**HTML Template**:
```html
<section class="py-20">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <!-- Section Header -->
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Section Title</h2>
      <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
        Section description explaining what this section contains.
      </p>
    </div>
    
    <!-- Content -->
    <div class="grid md:grid-cols-3 gap-8">
      <!-- Cards or content -->
    </div>
  </div>
</section>
```

---

### Features Section (3-Column)

**Visual**:
```
┌────────────────────────────────────────┐
│      Why Choose Us?                    │
│   Technical expertise with...          │
│                                        │
│  ┌──────┐  ┌──────┐  ┌──────┐        │
│  │  🛡️  │  │  ⚡  │  │  💻  │        │
│  │      │  │      │  │      │        │
│  │Secure│  │ Fast │  │Smart │        │
│  └──────┘  └──────┘  └──────┘        │
└────────────────────────────────────────┘
```

**HTML**:
```html
<section class="py-20 bg-background/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="text-center mb-16">
      <h2 class="text-4xl font-bold mb-4">Why Choose Us?</h2>
      <p class="text-xl text-muted-foreground">
        Technical expertise with innovative thinking
      </p>
    </div>
    
    <div class="grid md:grid-cols-3 gap-8">
      <div class="tech-card">
        <div class="w-16 h-16 bg-secondary rounded-lg flex items-center justify-center mb-4">
          <Icon class="w-8 h-8 text-primary" />
        </div>
        <h3 class="text-xl font-semibold mb-2">Secure</h3>
        <p class="text-muted-foreground">Enterprise-grade security</p>
      </div>
      <!-- More features... -->
    </div>
  </div>
</section>
```

---

### Stats Section (4-Column)

**Visual**:
```
┌────────────────────────────────┐
│  ┌────┐ ┌────┐ ┌────┐ ┌────┐ │
│  │500+│ │150+│ │99% │ │24/7│ │
│  │Proj│ │Clnt│ │Time│ │Supp│ │
│  └────┘ └────┘ └────┘ └────┘ │
└────────────────────────────────┘
```

**HTML**:
```html
<section class="py-20 bg-card/50">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div class="text-center">
        <div class="text-4xl md:text-5xl font-bold text-primary mb-2">500+</div>
        <div class="text-muted-foreground">Projects</div>
      </div>
      <!-- More stats... -->
    </div>
  </div>
</section>
```

---

## 📱 Responsive Layouts

### Mobile (< 768px)
```
Stack vertically
1 column grids
Full-width buttons
Smaller text sizes
Reduced padding
```

### Tablet (768px - 1024px)
```
2 column grids
Medium text sizes
Standard padding
```

### Desktop (> 1024px)
```
3-4 column grids
Larger text
Full spacing
```

---

## 📏 Spacing System

### Container Widths
```css
max-w-7xl:  1280px  /* Main content container */
max-w-4xl:   896px  /* Content sections */
max-w-3xl:   768px  /* Text content */
max-w-xl:    576px  /* Narrow content */
```

### Vertical Spacing
```css
py-20:  5rem   /* Main sections */
py-12:  3rem   /* Subsections */
py-8:   2rem   /* Small sections */
py-6:   1.5rem /* Component spacing */
py-4:   1rem   /* Tight spacing */
```

### Horizontal Padding
```css
px-4:   1rem   /* Mobile */
px-6:   1.5rem /* Tablet (sm:) */
px-8:   2rem   /* Desktop (lg:) */
```

### Grid Gaps
```css
gap-8:  2rem   /* Card grids */
gap-6:  1.5rem /* Content grids */
gap-4:  1rem   /* Form fields */
gap-2:  0.5rem /* Badges, tags */
```

---

## 🎨 Typography

### Hero Title
```css
font-size: clamp(2.25rem, 5vw, 4.5rem);  /* 36px - 72px */
font-weight: 700;
line-height: 1.1;
background: linear-gradient(135deg, #A8CAFF, #8FFFFF);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

### Section Heading (H2)
```css
font-size: 2.25rem;  /* 36px, responsive to 3rem on md */
font-weight: 700;
margin-bottom: 1rem;
```

### Subsection (H3)
```css
font-size: 1.25rem;  /* 20px, responsive to 1.5rem on md */
font-weight: 600;
```

### Body Text
```css
font-size: 1rem;     /* 16px */
line-height: 1.625;  /* relaxed */
color: #8B95A9;      /* muted-foreground */
```

### Subtitle
```css
font-size: 1.25rem;  /* 20px */
color: #8B95A9;      /* muted-foreground */
```

---

## 📊 Grid Systems

### 2-Column
```html
<div class="grid md:grid-cols-2 gap-8">
  <!-- Content -->
</div>
```

### 3-Column
```html
<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
  <!-- Content -->
</div>
```

### 4-Column
```html
<div class="grid grid-cols-2 md:grid-cols-4 gap-8">
  <!-- Content -->
</div>
```

### Asymmetric (2/3 + 1/3)
```html
<div class="grid lg:grid-cols-3 gap-12">
  <div class="lg:col-span-2">
    <!-- Main content (66%) -->
  </div>
  <div>
    <!-- Sidebar (33%) -->
  </div>
</div>
```

---

## 🎭 Animations

### Float Animation
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(5deg); }
}

.float {
  animation: float 3s ease-in-out infinite;
}
```

### Fade In
```css
@keyframes fade-in {
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.6s ease-out;
}
```

### Stagger Effect
```html
<div class="tech-card animate-fade-in" style="animation-delay: 0s"></div>
<div class="tech-card animate-fade-in" style="animation-delay: 0.1s"></div>
<div class="tech-card animate-fade-in" style="animation-delay: 0.2s"></div>
```

---

## 🎬 Transitions

### Standard Smooth
```css
transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
```
**Use For**: Hover states, color changes, transforms

### Bounce
```css
transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
```
**Use For**: Interactive feedback, emphasized interactions

---

## 📱 Responsive Breakpoints

```css
sm:  640px   /* Small tablets */
md:  768px   /* Tablets */
lg:  1024px  /* Small laptops */
xl:  1280px  /* Desktops */
2xl: 1536px  /* Large screens */
```

---

## 🎨 Page Structure Template

```html
<div class="min-h-screen">
  <!-- Hero Section -->
  <section class="min-h-screen">
    <!-- Hero content -->
  </section>
  
  <!-- Features Section -->
  <section class="py-20 bg-background/50">
    <!-- 3-column grid -->
  </section>
  
  <!-- Stats Section -->
  <section class="py-20 bg-card/50">
    <!-- 4-column stats -->
  </section>
  
  <!-- Services Section -->
  <section class="py-20">
    <!-- Service cards -->
  </section>
  
  <!-- CTA Section -->
  <section class="py-20">
    <!-- Call-to-action -->
  </section>
</div>
```

---

## 🎨 Background Alternation

Alternate section backgrounds for visual hierarchy:
```
Section 1: transparent (py-20)
Section 2: bg-background/50 (py-20)
Section 3: bg-card/50 (py-20)
Section 4: transparent (py-20)
Section 5: bg-card/30 (py-20)
```

---

## 📐 Section Header Pattern

```html
<div class="text-center mb-16">
  <h2 class="text-4xl font-bold mb-4">Section Title</h2>
  <p class="text-xl text-muted-foreground max-w-3xl mx-auto">
    Section subtitle or description explaining the content below.
  </p>
</div>
```

**Spacing**:
- Center aligned
- `mb-16` (4rem) bottom margin
- `mb-4` (1rem) between title and subtitle
- `max-w-3xl` (768px) for readable subtitle width

---

## 🎯 CTA Section

```html
<section class="py-20">
  <div class="max-w-4xl mx-auto px-4 text-center">
    <div class="tech-card p-8">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="text-xl text-muted-foreground mb-8">
        Let's discuss how we can help you.
      </p>
      <button class="btn-tech px-8 py-4">Start Project</button>
    </div>
  </div>
</section>
```

---

## 📏 Container Pattern

```html
<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <!-- Content -->
</div>
```

---

**See Also**: [COLOR_SYSTEM.md](./COLOR_SYSTEM.md) | [COMPONENTS.md](./COMPONENTS.md) | [DESIGN_TOKENS.css](./DESIGN_TOKENS.css)

