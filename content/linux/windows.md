# How to Install Windows 10/11 on Ubuntu Using KVM/QEMU

Running Windows inside Ubuntu is one of the most useful things you can do with Linux virtualization. Instead of installing VirtualBox or creating a dual-boot setup, you can run Windows 10 or Windows 11 as a virtual machine using **KVM/QEMU**, **libvirt**, and **Virtual Machine Manager (virt-manager)**.

> **Practical Environment:** `Windows 10 OS` is used as the primary hands-on operating system throughout this guide.

This guide walks through the complete process from installing KVM on Ubuntu to creating, installing, optimizing, and managing a Windows 10 virtual machine.

## Table of Contents

1. What We Are Building
2. KVM vs QEMU vs libvirt vs virt-manager
3. Requirements
4. Check Hardware Virtualization
5. Install KVM/QEMU and Virtualization Packages
6. Enable and Start libvirt
7. Configure User Permissions
8. Configure the libvirt Network
9. Verify the KVM Installation
10. Install and Open virt-manager
11. Download Windows 10 ISO
12. Download VirtIO Drivers
13. Create the Windows 10 Virtual Machine
14. Configure UEFI
15. Configure CPU and RAM
16. Configure the Virtual Disk
17. Configure the Network
18. Configure SPICE Display
19. Attach the VirtIO Driver ISO
20. Start Windows Installation
21. Load the VirtIO Storage Driver
22. Install Windows 10
23. Install VirtIO Guest Drivers
24. Install SPICE Guest Tools
25. Verify Windows Hardware
26. Test Internet Connectivity
27. Create the First Snapshot
28. Start and Stop the VM
29. USB Passthrough
30. File Sharing Between Ubuntu and Windows
31. Clipboard Sharing
32. Performance Optimization
33. VM Backup
34. Useful virsh Commands
35. Common Problems and Solutions
36. Recommended Configuration
37. Final Checklist
38. Conclusion

---

# 1. What We Are Building

The final environment will look like this:

```text
┌──────────────────────────────────────────────┐
│                 Ubuntu Host                  │
│                                              │
│  ┌────────────────────────────────────────┐  │
│  │              virt-manager              │  │
│  │                  │                     │  │
│  │               libvirt                  │  │
│  │                  │                     │  │
│  │                 QEMU                   │  │
│  │                  │                     │  │
│  │                 KVM                    │  │
│  │                  │                     │  │
│  │      ┌──────────────────────────┐      │  │
│  │      │       Windows 10         │      │  │
│  │      │                          │      │  │
│  │      │  4 vCPU                  │      │  │
│  │      │  6 GB RAM                │      │  │
│  │      │  VirtIO Disk             │      │  │
│  │      │  VirtIO Network          │      │  │
│  │      │  SPICE Display           │      │  │
│  │      └──────────────────────────┘      │  │
│  └────────────────────────────────────────┘  │
│                                              │
│               Intel VT-x / KVM               │
└──────────────────────────────────────────────┘
```

The technologies have different jobs:

- **KVM** — `KVM` is the actual hardware virtualization mechanism built into the Linux kernel.
- **QEMU** — `QEMU` provides the virtual machine and virtual hardware.
- **libvirt** — `libvirt` manages QEMU/KVM virtual machines and their resources.
- **virt-manager** — `virt-manager` provides a graphical interface for libvirt.

This combination is widely used for Linux virtualization and is an excellent foundation for learning virtualization and DevOps.

Other essentials are —

- **OVMF** — Provides UEFI firmware for the VM.
- **VirtIO** — High-performance virtual devices for storage and networking.
- **SPICE** — Provides a better graphical console and guest integration.

# 2. Requirements

### Hardware

You should have:

- 64-bit Intel or AMD processor
- Hardware virtualization enabled
- At least 8 GB RAM
- At least 80 GB free disk space
- SSD recommended
- Ubuntu installed

For a comfortable Windows VM, **16 GB RAM or more** is preferable.

### Recommended Windows VM resources

For a host with 16 GB RAM:

```text
CPU:       4 vCPU
RAM:       6 GB
Disk:      80–100 GB
Network:   VirtIO
Storage:   VirtIO
Display:   SPICE
Firmware:  UEFI
```

You can increase or decrease these later.

# 3. Check Hardware Virtualization

Open Terminal.

Run:

```bash
lscpu | grep -E 'Virtualization|Model name'
```

On an Intel system, you should see something similar to:

```text
Model name: Intel(R) Core(TM) i5-1135G7
Virtualization: VT-x
```

For AMD:

```text
Virtualization: AMD-V
```

### Check whether `/dev/kvm` exists

Run:

```bash
ls -l /dev/kvm
```

You should see something similar to:

```text
crw-rw----+ 1 root kvm ... /dev/kvm
```

### Install the KVM checker

```bash
sudo apt update
sudo apt install -y cpu-checker
```

Then:

```bash
kvm-ok
```

Expected result:

```text
INFO: /dev/kvm exists
KVM acceleration can be used
```

If KVM acceleration is unavailable, enter your computer's BIOS/UEFI and enable hardware virtualization.

For Intel systems, the option may be called:

```text
Intel Virtualization Technology
VT-x
Intel VT
```

For AMD systems:

```text
SVM
AMD-V
```

# 4. Install KVM/QEMU and Virtualization Packages

Ubuntu 26.04 uses newer HWE virtualization packages, so older tutorials may show slightly different package names.

Install the main components:

```bash
sudo apt update
```

```bash
sudo apt install -y \
qemu-system-x86 \
qemu-utils \
libvirt-daemon-system \
libvirt-clients \
virt-manager \
ovmf \
bridge-utils \
dnsmasq-base \
cpu-checker
```

### What these packages provide
