Effect composer creates two render targets, let's call them _rtA_ and _rtB_. Each target is an intermediate buffer that gets inserted between the renderer and the canvas.

The first pass is a renderpass, subsequent passes including the final one alternate between _rtB_ and _rtA_.
