import { writable } from 'svelte/store';
import axios from 'axios'


import AllColors from './db.colors.js'
import AllMibands from './db.mibands.js'
import ColorLookup from './db.colorLookup.js'

function createInfoStore() {

	const random = parseInt( Math.random() * AllColors.length )
	const mbMemory = 200 + parseInt(Math.random() * 56)
	const temperature = 32 + parseInt( Math.random() * 60 )

	const getInfoByIndex = colorIndex => {

		const color = AllColors[ colorIndex ]
		const deviceIndex = color.id
		const colorName = color.hostname
		const miband = AllMibands[ colorIndex ]
		const mibandName = miband.mac_address
		const fgColor = ColorLookup[ color.fg ]
		const bgColor = ColorLookup[ color.bg ]

		return {
			colorIndex,
			color,
			deviceIndex,
			colorName,
			mibandName,
			mibandNumber: miband.id,
			fgColor,
			bgColor
		}
	}

	const setColorIndex = index => {
		const newData = getInfoByIndex( index )
		update( u => {
			return { ...u, ...newData }
		})
	}
	const iterateColorIndex = amt => {

		update( u => {

			let index = u.colorIndex + amt
			if (index >= AllColors.length) index = 0
			if (index < 0) index = AllColors.length - 1
			const newData = getInfoByIndex( index )
			return { ...u, ...newData }
		})
	}

	const { subscribe, set, update } = writable( { 
		...getInfoByIndex( 0 ),
		mibandInitialised: true,
		mibandConnected: true,
		mbMemory,
		temperature,
		wlan0: `D'Haus Public 2.4GHZ`, 
		drives: [],
		showDrafts: true
	} );

	const toggleDrafts = () => {
		update( s => {
			s.showDrafts = !s.showDrafts;
			console.log('[stores] toggling drafts to:', s.showDrafts);
			return s;
		})
	}

	return {
		subscribe,
		toggleDrafts,
		update,
		setColorIndex,
		iterateColorIndex,
		grab: async () => {

			console.log('[stores] ℹ️ getting info... ');
			try {
				// DISABLED FOR DEMO
				// let res = await axios.get('/info?as=json');
				// let d = res.data;
				// console.log('[stores] ℹ️✅ info :  ', d);
				// if (d) update( n => d );
			} catch (err) {
				console.log('[stores] ℹ️❌ info :  ', err);
			}
		}
	}
}

export const info = createInfoStore();
export const overlay = writable( null );
export const route = writable( {} );
export const konsole = writable( [] )
export const eyeball = writable( { title: 'Title (pending)', message: 'Message (pending)', button: 'Press' } )
export const backend = writable( {} )