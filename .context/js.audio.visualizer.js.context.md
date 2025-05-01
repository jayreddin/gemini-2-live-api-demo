# Context Summary: js/audio/visualizer.js

This file defines the `AudioVisualizer` class, responsible for rendering real-time audio waveform visualizations. Key features include:

- **Web Audio API Integration:** Uses an AnalyserNode to process audio data in real-time.
- **Canvas Rendering:** Draws smooth, animated waveforms on a canvas element, with gradient coloring and glow effects.
- **Responsive Design:** Handles window resizing and dynamically adjusts the visualization.
- **Animation Control:** Provides methods to start, stop, and clean up the animation loop.
- **Customization:** Supports configurable line width, padding, smoothing, and color gradients for visual appeal.
- **Resource Management:** Cleans up event listeners and disconnects audio nodes when finished.

This class enhances the user experience by providing a visually engaging representation of live audio input.