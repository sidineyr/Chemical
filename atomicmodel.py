import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

# Constants for colors
POSITIVE_COLOR = 'red'
NEGATIVE_COLOR = 'black'
NEUTRON_COLOR = 'green'

# Function to draw the Thomson model (Plum Pudding Model)
def draw_thomson(ax):
    ax.set_title("Thomson Model (Plum Pudding)")
    # Positive charge background
    circle = plt.Circle((0, 0), 1, color=POSITIVE_COLOR, alpha=0.3)
    ax.add_patch(circle)
    # Electrons (negative charges)
    for _ in range(6):
        angle = np.random.uniform(0, 2 * np.pi)
        x, y = np.cos(angle), np.sin(angle)
        ax.plot(x, y, 'o', color=NEGATIVE_COLOR, markersize=10)
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.5, 1.5)

# Function to draw the Rutherford model
def draw_rutherford(ax):
    ax.set_title("Rutherford Model (Nuclear Model)")
    # Nucleus (positive charge)
    ax.plot(0, 0, 'o', color=POSITIVE_COLOR, markersize=20)
    # Electrons (negative charges) orbiting
    angles = np.linspace(0, 2 * np.pi, 6, endpoint=False)
    x, y = np.cos(angles), np.sin(angles)
    ax.plot(x, y, 'o', color=NEGATIVE_COLOR, markersize=10)
    ax.set_xlim(-1.5, 1.5)
    ax.set_ylim(-1.5, 1.5)

# Function to draw the Bohr model
def draw_bohr(ax):
    ax.set_title("Bohr Model (Planetary Model)")
    # Nucleus (positive charge)
    ax.plot(0, 0, 'o', color=POSITIVE_COLOR, markersize=20)
    # Electrons (negative charges) in fixed orbits
    orbits = [0.5, 1.0, 1.5]
    for r in orbits:
        circle = plt.Circle((0, 0), r, color='gray', fill=False, linestyle='--')
        ax.add_patch(circle)
        ax.plot(r, 0, 'o', color=NEGATIVE_COLOR, markersize=10)
    ax.set_xlim(-2, 2)
    ax.set_ylim(-2, 2)

# Function to draw the Rutherford-Bohr model
def draw_rutherford_bohr(ax):
    ax.set_title("Rutherford-Bohr Model")
    # Nucleus (positive charge and neutrons)
    ax.plot(0, 0, 'o', color=POSITIVE_COLOR, markersize=20)
    ax.plot(0.1, 0.1, 'o', color=NEUTRON_COLOR, markersize=10)
    # Electrons (negative charges) in fixed orbits
    orbits = [0.5, 1.0, 1.5]
    for r in orbits:
        circle = plt.Circle((0, 0), r, color='gray', fill=False, linestyle='--')
        ax.add_patch(circle)
        ax.plot(r, 0, 'o', color=NEGATIVE_COLOR, markersize=10)
    ax.set_xlim(-2, 2)
    ax.set_ylim(-2, 2)

# Function to draw the newest atomic model (Quantum Mechanical Model)
def draw_newest_model(ax):
    ax.set_title("Quantum Mechanical Model")
    # Nucleus (positive charge and neutrons)
    ax.plot(0, 0, 'o', color=POSITIVE_COLOR, markersize=20)
    ax.plot(0.1, 0.1, 'o', color=NEUTRON_COLOR, markersize=10)
    # Electron cloud (probability distribution)
    x = np.linspace(-2, 2, 100)
    y = np.linspace(-2, 2, 100)
    X, Y = np.meshgrid(x, y)
    Z = np.exp(-(X**2 + Y**2))
    ax.contourf(X, Y, Z, levels=50, cmap='Blues', alpha=0.5)
    ax.set_xlim(-2, 2)
    ax.set_ylim(-2, 2)

# List of drawing functions for each model
models = [draw_thomson, draw_rutherford, draw_bohr, draw_rutherford_bohr, draw_newest_model]

# Animation function
def animate(frame):
    ax.clear()
    ax.set_xticks([])
    ax.set_yticks([])
    models[frame](ax)

# Create the figure and axis
fig, ax = plt.subplots(figsize=(6, 6))
ax.set_aspect('equal')

# Create the animation
ani = FuncAnimation(fig, animate, frames=len(models), interval=3000, repeat=True)

# Show the animation
plt.show()
