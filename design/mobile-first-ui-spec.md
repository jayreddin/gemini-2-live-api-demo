# Mobile-First UI/UX Design Specification

## Core Layout Principles

### Viewport Considerations
- Base viewport: 360px - 428px (modern mobile devices)
- Responsive breakpoints:
  - Mobile: 360px - 767px
  - Tablet: 768px - 1023px
  - Desktop: 1024px+
- Safe areas: 
  - Top: env(safe-area-inset-top) + 16px
  - Bottom: env(safe-area-inset-bottom) + 16px
  - Sides: 16px minimum padding

### Component Hierarchy (Mobile)

1. Header Row (60px height)
   - Disconnect Button (left)
     - Touch target: 44x44px
     - Visual size: 36x36px
     - Red accent color
   - Audio/Text Switch (right)
     - Touch target: 44x44px
     - Toggle style with clear visual states

2. Chat Display Area (dynamic height)
   - Flexible height based on content
   - Min-height: 40vh on mobile
   - Smooth scrolling enabled
   - Last message always visible
   - Message bubbles: 16px padding

3. Audio Visualizer Section
   - Height: 80px
   - Full width with 16px padding
   - Responsive to audio input
   - Smooth animations (60fps)

4. Control Banner (72px height)
   - Four icon buttons in row:
     - Camera toggle
     - Screen share
     - Microphone
     - Settings
   - Each button:
     - Touch target: 56x56px minimum
     - Icon size: 24x24px
     - 16px spacing between buttons

5. Input Area (60px height)
   - Text input (flexible width)
     - 44px height
     - 16px padding
   - Send button
     - Touch target: 44x44px
     - Icon size: 24x24px

### Touch Interaction Specifications

1. Touch Targets
   - Primary buttons: 56x56px minimum
   - Secondary buttons: 44x44px minimum
   - Interactive elements spacing: 8px minimum
   - Tap highlight feedback: 150ms duration

2. Gestures
   - Video Box Dragging:
     - Drag handle: 44x44px
     - Snap points at corners
     - Momentum scrolling
     - 60fps animations
   - Pinch-to-zoom:
     - Scale: 0.5x to 2x
     - Smooth transitions
     - Bounce at limits

3. Modal Interactions
   - Video Preview Modal:
     - Swipe down to dismiss
     - Tap outside to close
     - Safe dismiss area: 44px from edges
   - Settings Modal:
     - Full-screen on mobile
     - Slide up animation
     - Swipe down to dismiss

### Visual States & Feedback

1. Button States
   - Default: 0.9 opacity
   - Active: 1.0 opacity + glow
   - Disabled: 0.5 opacity
   - Loading: Pulse animation

2. Microphone Active State
   - Pulse animation (subtle)
   - Color shift to accent
   - Ripple effect on voice detection

3. Camera Preview
   - Floating rounded rectangle
   - Shadow elevation: 8dp
   - Drag handle indicator
   - Camera switch button overlay

### Theme Support

1. Light Theme
   - Background: #FFFFFF
   - Primary text: #000000 (90% opacity)
   - Secondary text: #000000 (60% opacity)
   - Accent: #0066FF
   - Surface: #F5F5F5

2. Dark Theme
   - Background: #121212
   - Primary text: #FFFFFF (90% opacity)
   - Secondary text: #FFFFFF (60% opacity)
   - Accent: #2196F3
   - Surface: #1E1E1E

### Accessibility Considerations

1. Touch Targets
   - All interactive elements: minimum 44x44px
   - Icon buttons: minimum 56x56px
   - Label association with controls
   - Clear focus indicators

2. Visual Hierarchy
   - Contrast ratio: 4.5:1 minimum
   - Text size: 16px minimum
   - Icon clarity at 24x24px minimum
   - Status indicators: Multiple cues

3. Interaction Support
   - Screen reader compatibility
   - Keyboard navigation support
   - Focus trap in modals
   - Error announcements

## Responsive Adaptations

### Tablet Layout (768px+)
- Split view capability
- Larger touch targets retained
- Chat side panel option
- Expanded visualizer
- Multi-column settings modal

### Desktop Layout (1024px+)
- Maintain mobile-first touch targets
- Enhanced keyboard support
- Hover states added
- Multi-window support
- Docked video preview option

## Implementation Notes

1. Performance Guidelines
   - 60fps animations
   - Touch response < 100ms
   - Modal transitions < 300ms
   - Lazy load non-critical UI

2. State Management
   - Clear loading states
   - Optimistic UI updates
   - Error state handling
   - Network status indicators

3. Progressive Enhancement
   - Core functionality without JS
   - Enhanced touch features
   - Fallback patterns defined
   - Graceful degradation steps

This specification prioritizes mobile user experience while ensuring seamless adaptation to larger screens. All measurements are in logical pixels and should be adjusted for device pixel ratios.