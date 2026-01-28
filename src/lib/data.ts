import { ConceptsCardType, FacilitiesCardType } from './types'

export const CONCEPTS: ConceptsCardType[] = [
	{
		title: 'Multi-functional Board Meeting Setup',
		text: 'A spacious boardroom with dedicated areas for private discussions, supported by full catering. We also offer optional VIP services, including arranged transportation, dry cleaning, and custom boardroom décor.',
		image: '/concepts/concepts-1.png',
		link: '/get-a-quote',
		containerClasses: 'bg-white-spaces text-black-spaces text-left',
		buttonClasses: 'bg-midnight-spaces text-white-spaces',
	},
	{
		title: 'Mini-Conferences, Panels & Keynotes',
		text: 'Our spaces can be configured to suit a variety of formats, from traditional seating to standing tables—or a combination of both. Breakout rooms are available for focused sessions, and catering can be arranged to your preference, from a separate buffet room to a cocktail-style reception.',
		image: '/concepts/concepts-2.png',
		link: '/get-a-quote',
		containerClasses:
			'bg-white-spaces text-black-spaces text-right lg:text-left',
		buttonClasses: 'bg-midnight-spaces text-white-spaces',
	},
	{
		title: 'Trainings, Seminars & Action Tanks',
		text: 'Our facilities can accommodate boardroom-style seminars or mini-auditorium seating arrangements. In addition to breakout areas for smaller action groups, we offer spaces for relaxation and dining between sessions.',
		image: '/concepts/concepts-3.png',
		link: '/get-a-quote',
		containerClasses: 'bg-white-spaces text-black-spaces text-left',
		buttonClasses: 'bg-midnight-spaces text-white-spaces',
	},
]

/* export const CONCEPTS: ConceptsCardType[] = [
	{
		title: 'Multi-functional Board Meeting Approach',
		text: 'A large board meeting room with additional areas for more private discussions and full catering service. We are happy to provide you with additional VIP services, ranging from arranged transportation or dry-cleaning to special board room decorative arrangements.',
		image: '/office-3.jpg',
		link: '/access',
		containerClasses: 'bg-black-spaces text-white-spaces text-left',
		buttonClasses: 'bg-white-spaces text-black-spaces',
	},
	{
		title: 'Mini-Conferences, Panel Discussions & Keynote Speeches',
		text: "Our spaces allow for a variety of approaches to your conference, ranging from pure seating arrangements to stand up table arrangements, to a mix of the two. Furthermore, we can arrange for break-out rooms for special sessions. And, we can adapt to how you want the catering service to be conducted, from a separate room for a buffet to a cocktail-style reception. Not to forget, it is a stone's throw away for many EU decision-makers.",
		image: '/office-4.jpg',
		link: '/access',
		containerClasses:
			'bg-beje-spaces text-black-spaces text-right lg:text-left',
		buttonClasses: 'bg-eucalyptus-spaces text-beje-spaces',
	},
	{
		title: 'Trainings, Seminars & Action Tanks',
		text: 'Our facilities will accommodate either boardroom-style seminar discussions or mini-auditorium seating arrangements. Apart from break-out areas for the smaller action groups, we also provide areas for relaxing and dining in-between the sessions.',
		image: '/office-5.jpg',
		link: '/access',
		containerClasses: 'bg-brown-spaces text-white-spaces text-left',
		buttonClasses: 'bg-white-spaces text-black-spaces',
	},
] */

export const FACILITIES: FacilitiesCardType[] = [
	{
		title: 'Board and Conference Room',
		text: 'The centerpiece of our facilities accommodates up to 20 people in a boardroom setup or up to 40 in a conference, panel, or keynote arrangement. Seating can be configured with chairs, standing tables, or a combination of both.',
		images: [
			'/facilities/facilities-1a.png',
			'/facilities/facilities-1b.png',
			'/facilities/facilities-1c.png',
		],
		firstLink: '/',
		secondLink: '/',
		floorplan: '/facilities/floorplans/conference.png',
	},
	{
		title: 'Relaxation Break-Out Room',
		text: 'Adjacent to the Board and Conference Room, this space offers a more relaxed setting for both open and private discussions.',
		images: [
			'/facilities/facilities-2a.png',
			'/facilities/facilities-2b.png',
			'/facilities/facilities-2c.png',
		],
		firstLink: '/',
		secondLink: '/',
		floorplan: '/facilities/floorplans/lounge.png',
	},
	{
		title: 'Catering / Meeting Room 2',
		text: 'This room can serve as a buffet or cocktail-style space with standing tables, or, if additional meeting space is needed, it can be converted into a boardroom for up to 8 people.',
		images: [
			'/facilities/facilities-3a.png',
			'/facilities/facilities-3b.png',
			'/facilities/facilities-3c.png',
		],
		firstLink: '/',
		secondLink: '/',
		floorplan: '/facilities/floorplans/catering.png',
	},
	{
		title: 'Meeting Room 3',
		text: 'Our second-largest boardroom accommodates up to 12 people and is ideal for all types of round-table discussions.',
		images: [
			'/facilities/facilities-4a.png',
			'/facilities/facilities-4b.png',
			'/facilities/facilities-4c.png',
		],
		firstLink: '/',
		secondLink: '/',
		floorplan: '/facilities/floorplans/small-meeting.png',
	},
]
