
## Abstract
**This document explores the intricate world of Complex Fourier Series and its application in approximating functions through the lens of rotating circles in the complex plane. We begin by establishing the foundations of the series, introducing key concepts such as complex coefficients $c_{n}$ and their role in shaping the oscillatory behavior of the series. The document delves into the representation of functions $f(t)$ as a sum of terms $c_{n}e^{i2\pi nt}$, where each term is akin to a rotating complex phasor. Emphasizing the significance of $c_{n}$ in determining amplitude and phase, we elucidate how these rotating circles collectively contribute to the depiction of the function.**


# Introduction

To depict a graphical illustration, we must examine a function $f(t)$ defined on the set of real numbers as its domain, with a range consisting of complex numbers. In this context, the variable $t$ symbolizes time. For our discourse, we stipulate that time spans from $0$ to $1$. The initiation of the drawing process occurs at $t = 0$, and at $t = 1$, the drawing is fully traced, returning to the initial point. 

We can express $f(t)=a(t)+ib(t)$, where $i$ is imaginary unit ($i^2 = -1$) and $a(t)$ and $b(t)$ are functions defined on the set of real numbers as their domain and range. The result of $a(t)$ corresponds to the x-coordinate of the tracing at time $t$, and the result of $b(t)$ corresponds to the y-coordinate of the tracing at time $t$ in the Cartesian coordinate plane.

With the foundation established for describing an illustration in the Cartesian coordinate plane using the function $f(t)$, let's delve into the utilization of the Complex Fourier Series to facilitate the representation and tracing of this drawing.

# Complex Fourier Series

In engineering, Fourier series play a crucial role as they enable the representation of functions as an infinite sum of sines and cosines. The complex form of the Fourier series enhances this utility by illustrating periodic functions in complex planes, providing a more comprehensive framework for analysis and manipulation. We initiate our discussion with a real-valued function $f(t)$, where both the domain and range are real numbers. Subsequently, we'll be applying the Complex Fourier Series to this function.

The general expression for a Complex Fourier Series is given by:

$$f(t) = \sum_{n = -\infty}^{\infty}c_{n}e^{\tfrac{i2\pi nt}{T}}$$
where,
$$c_{n} = \frac{1}{T} \int_{-\tfrac{T}{2}}^{\tfrac{T}{2}} f(t)e^{\tfrac{-i2\pi nt}{T}}\,dt$$ 
for $n = 0, \pm1, \pm2, \pm3, \ldots$ and $f(t)$, a function of the continuous variable $t$, is periodic with a period $T$.


To access complete explanation visit: https://drive.google.com/file/d/1jbHoSTUVZyFCyqAApoBy7OuAUNCu6T_U/view?usp=sharing
