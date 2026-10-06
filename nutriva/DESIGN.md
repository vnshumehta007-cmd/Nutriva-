---
name: Nutriva
colors:
  surface: '#fbf9f6'
  surface-dim: '#dbdad7'
  surface-bright: '#fbf9f6'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f0'
  surface-container: '#efeeeb'
  surface-container-high: '#e9e8e5'
  surface-container-highest: '#e3e2e0'
  on-surface: '#1b1c1a'
  on-surface-variant: '#434843'
  inverse-surface: '#30312f'
  inverse-on-surface: '#f2f1ee'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#4a654f'
  on-secondary: '#ffffff'
  secondary-container: '#c9e7cc'
  on-secondary-container: '#4e6953'
  tertiary: '#271013'
  on-tertiary: '#ffffff'
  tertiary-container: '#3f2427'
  on-tertiary-container: '#b0898c'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#cceacf'
  secondary-fixed-dim: '#b0ceb4'
  on-secondary-fixed: '#062010'
  on-secondary-fixed-variant: '#334d38'
  tertiary-fixed: '#ffd9dc'
  tertiary-fixed-dim: '#e7bcbf'
  on-tertiary-fixed: '#2d1417'
  on-tertiary-fixed-variant: '#5d3f42'
  background: '#fbf9f6'
  on-background: '#1b1c1a'
  surface-variant: '#e3e2e0'
typography:
  display-lg:
    fontFamily: Montserrat
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Montserrat
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Montserrat
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 20px
  margin-desktop: 64px
  max-width: 1280px
---

## Brand & Style

The design system is anchored in a high-end health-tech aesthetic that balances clinical expertise with approachable wellness. It follows a **Minimalist** and **Corporate Modern** style, utilizing heavy whitespace and a sophisticated "Digital Apothecary" vibe to evoke a sense of calm, precision, and luxury.

The user experience should feel bespoke and quiet. Visual noise is eliminated to allow the expert guidance of the nutritionists to take center stage. The interface relies on premium typography and a restricted, nature-inspired palette to build trust and signal a high-tier SaaS service.

## Colors

The palette is rooted in organic, earthy tones that differentiate it from the sterile blues often found in medical tech.

- **Primary (Forest Green):** Used for primary actions, navigation headers, and authoritative elements. It represents growth and professional depth.
- **Secondary (Sage Green):** Used for accents, secondary buttons, and success states. It provides a soft, soothing contrast to the deep primary green.
- **Background (Ivory):** The main canvas. This warm off-white prevents the "clinical" feel of pure white, adding a premium, editorial quality.
- **Neutral (Beige):** Used for section staggering, background containers, and subtle UI dividers to create gentle depth without using harsh lines.
- **Typography (Charcoal):** Provides high-contrast readability. Avoid absolute black to maintain the soft, high-end aesthetic.

## Typography

This design system uses a dual-font approach to achieve a "Bold Health-Tech" look. 

**Montserrat** is used for headings to provide a confident, geometric, and modern presence. Tighten letter spacing on larger display sizes to maintain a premium feel. 

**Inter** is utilized for all body copy and UI labels. It provides exceptional legibility for complex nutritional data, meal plans, and consultation notes. Use a slightly larger default body size (18px) for long-form reading to enhance the premium, accessible experience.

## Layout & Spacing

The layout philosophy follows a **Fixed Grid** on desktop (12 columns) and a **Fluid Grid** on mobile (4 columns). 

Generous whitespace is the defining characteristic of this design system. Sections should be separated by `xl` spacing to create an editorial flow. Use the `md` unit for internal card padding and `lg` for grouping related content blocks. Content should be centered within the `max-width` container on large screens to ensure readability and focus.

## Elevation & Depth

To maintain a clean SaaS influence, this design system uses **Ambient Shadows** and **Tonal Layers** rather than heavy borders.

1.  **Low Elevation:** Surface-level cards use a very subtle, diffused shadow (Offset: 0, 4px; Blur: 20px; Opacity: 4% Charcoal) against the Ivory background.
2.  **Mid Elevation:** Used for hover states or active selection. The shadow deepens slightly (Opacity: 8%) and the secondary Sage color may appear as a soft glow or subtle underline.
3.  **Tonal Depth:** Use the Neutral Beige for "well" containers—areas that house groups of items, like a list of daily meals or a progress chart—to create a sense of recession and organization.

## Shapes

The shape language is sophisticated and friendly. Standard UI elements like buttons and input fields use a `0.5rem` radius. Larger containers, such as dashboard cards and profile headers, use `1rem` (rounded-lg) to soften the overall technical feel of the platform. Buttons never use a full pill-shape, as the structured `0.5rem` radius feels more professional and aligned with the "Expert" personality.

## Components

-   **Buttons:** Primary buttons are solid Forest Green with Ivory text. Secondary buttons are Ivory with a Sage Green border. Text is always centered and uses `label-md` for clarity.
-   **Cards:** Use the `rounded-lg` radius with Ivory background and the low-elevation shadow. Ensure internal padding is at least `md` (24px) to maintain the spacious aesthetic.
-   **Inputs:** Fields are Ivory with a subtle Beige stroke. Upon focus, the stroke changes to Sage Green. Label text sits above the field using `label-sm`.
-   **Chips/Badges:** Used for dietary tags (e.g., "Keto", "High Protein"). These use a solid Sage Green background with a low-opacity Forest Green text for a monochromatic, sophisticated look.
-   **Lists:** Nutrition data lists should be borderless, using alternating Neutral Beige backgrounds for every second row to maintain a clean, organized appearance.
-   **Data Visualization:** Graphs and charts should prioritize Sage Green and Forest Green, using the Charcoal text for all axis labels to ensure legibility.