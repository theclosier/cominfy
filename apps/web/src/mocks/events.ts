export interface Event {
    id: string;
    communityId: string;
    title: string;
    description: string;
    startDate: string;
    location: string;
    capacity: number;
    registeredCount: number;
    image: string;
    status: 'PUBLISHED' | 'DRAFT';
    platform: 'Luma' | 'Eventbrite' | 'Meetup' | 'Kommunity';
}

export const MOCK_EVENTS: Event[] = [
    {
        id: 'e1',
        communityId: 'c1',
        title: 'Büyük Buluşma: Microservices',
        description: 'Microservices mimarisi üzerine derinlemesine bir sohbet.',
        startDate: '2026-06-15T14:00:00',
        location: 'Kolektif House Levent',
        capacity: 100,
        registeredCount: 85,
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1000',
        status: 'PUBLISHED',
        platform: 'Luma'
    },
    {
        id: 'e2',
        title: 'React 19 Yenilikleri',
        description: 'React ekosistemindeki son gelişmeler.',
        startDate: '2026-06-20T19:00:00',
        location: 'Online (Zoom)',
        capacity: 500,
        registeredCount: 320,
        image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&q=80&w=1000',
        status: 'PUBLISHED',
        platform: 'Eventbrite'
    },
    {
        id: 'e3',
        communityId: 'c2',
        title: 'Yatırımcı Buluşması',
        description: 'Melek yatırımcılarla networking etkinliği.',
        startDate: '2026-06-25T09:00:00',
        location: 'Swisshotel Bosphorus',
        capacity: 50,
        registeredCount: 48,
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1000',
        status: 'DRAFT',
        platform: 'Meetup'
    },
    {
        id: "ev-101",
        communityId: "c1",
        title: "2023 Kış Zirvesi",
        description: "Geçen yılın en büyük yazılım buluşması. 500+ katılımcı ile teknolojinin geleceğini konuştuk.",
        startDate: "2023-12-15T10:00:00",
        location: "Kolektif House, Levent",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=2670",
        capacity: 500,
        registeredCount: 500,
        status: "PUBLISHED",
        platform: "Luma"
    },
    {
        id: "ev-102",
        communityId: "c1",
        title: "Golang Workshop",
        description: "Go diline giriş ve microservices mimarisi üzerine pratik bir atölye çalışması.",
        startDate: "2024-03-10T14:00:00",
        location: "Online",
        image: "https://images.unsplash.com/photo-1623479322729-28b25c16b011?auto=format&fit=crop&q=80&w=2670",
        capacity: 50,
        registeredCount: 48,
        status: "PUBLISHED",
        platform: "Kommunity"
    },
];
