const data = [
    {
        name: 'Favoriten',
        icon: { name: 'favorite', colored: true },
        path: '/',
        size: '320kB',
        lastChanged: new Date(2022, 10, 1, 14, 4)
    },
    {
        name: 'Meine persönlichen Dateien',
        icon: { name: 'folder' },
        path: '/files/my',
        size: '640kB',
        lastChanged: new Date(2022, 10, 1, 14, 4)
    },
    {
        name: 'Kurs-Dateien',
        icon: { name: 'folder_shared' },
        path: '/files/courses',
        size: '1.28MB',
        lastChanged: new Date(2021, 10, 1, 14, 4)
    },
    {
        name: 'Team-Dateien',
        icon: { name: 'folder_shared' },
        path: '/cfiles/teams',
        size: '2.56MB',
        lastChanged: new Date(2019, 11, 1, 14, 4)
    },
    {
        name: 'Mit mir geteilte Dateien',
        icon: { name: 'folder_shared' },
        path: '/files/shared',
        size: '5.12MB',
        lastChanged: new Date(2022, 10, 1, 9, 4)
    },
];

export default data;
