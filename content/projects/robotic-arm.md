# Overview

This project covers the design, build, and control of a small **6-DOF desktop robotic arm** with inverse kinematics. The goal was to create a repeatable platform for experimenting with motion planning and embedded control.

## Hardware

- Custom 3D-printed links and joints
- Stepper motors with Trinamic drivers
- STM32-based controller board
- End-effector with simple gripper

## Software

Inverse kinematics are solved in real time on the MCU. The pipeline:

1. **Input**: Target pose (x, y, z, roll, pitch, yaw) or joint angles
2. **IK solver**: Numerical solution with joint limits and singularity handling
3. **Output**: Trajectory sent to stepper drivers

Code is written in C++ with a small PC-side tool for calibration and path teaching.

## Next steps

- Add force sensing at the wrist
- Integrate with a camera for simple visual servoing
- Document the CAD and BOM for others to build

---

*Replace this file with your own content. Use standard Markdown: headings, **bold**, lists, [links](https://example.com), and `code`.*
