const hosts = {
    "20220414001": {
        general: {
            hostname: 'PC01-SINFO01',
            ip: '192.168.1.6',
            os: 'Linux Debian',
            online: true,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
    "20220414002": {
        general: {
            hostname: 'PC02-SINFO01',
            ip: '192.168.1.7',
            os: 'Linux Ubuntu',
            online: false,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
    "20220414003": {
        general: {
            hostname: 'PC03-SINFO01',
            ip: '192.168.1.8',
            os: 'Windows 10',
            online: true,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
    "20220414004": {
        general: {
            hostname: 'PC04-SINFO01',
            ip: '192.168.1.9',
            os: 'IOS',
            online: false,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
    "20220414005": {
        general: {
            hostname: 'PC05-SINFO01',
            ip: '192.168.1.10',
            os: 'Linux Debian',
            online: true,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
    "20220414006": {
        general: {
            hostname: 'PC06-SINFO01',
            ip: '192.168.1.11',
            os: 'Linux Debian',
            online: true,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
    "20220414007": {
        general: {
            hostname: 'PC07-SINFO01',
            ip: '192.168.1.12',
            os: 'Linux CentOS',
            online: false,
        },
        memory: {
            total: 4294967296, // bytes
            used: 1572864, // bytes
            available: 2621440, // bytes
        },
        cpu: {
            model: 'Intel(R) Core(TM) i3-2100 CPU @ 3.10GHz',
            architecture: 'x86_64',
            cores: 4,
            threads_core: 2,
            sockets: 1,
            used: 50, // %
            temperature: 40, // °C
            clock: 2693.776, // MHz
            clock_max: 3100, // MHz
            clock_min: 1600, // MHz
        },
        nic: {
            'enp0s3': {
                ip: '192.168.1.6',
                mask: '255.255.255.0',
                mac: 'ab:cd:ef:12:34:56',
                tx_pckts: 84802,
                rx_pckts: 107049,
            },
        },
        devices: {
            'sda1': {
                used: 230025547776, // bytes
                available: 199471177728, // bytes
                total: 429496725504, // bytes
                mount_point: '/mnt/hd_files',
            },
            'sda2': {
                used: 11439345664, // bytes
                available: 52312444928, // bytes
                total: 67198562304, // bytes
                mount_point: '/',
            },
        },
    },
};

export { hosts };
