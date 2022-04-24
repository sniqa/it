import { TextField, OutlinedInput } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useState, KeyboardEvent } from 'react'

interface SearchbarProps {
	onSearch: (val: string) => void
}

const Searchbar = ({ onSearch }: SearchbarProps) => {
	const [text, setText] = useState('')

	const onEnter = (
		e: KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>
	) => {
		if (e.nativeEvent.key === 'Enter') {
			onSearch(text)
		}

		return
	}

	return (
		<div className="w-full flex items-center justify-center bg-light-50">
			<OutlinedInput
				className="bg-light-50"
				fullWidth
				endAdornment={
					<SearchIcon
						onClick={() => onSearch(text)}
						className={`cursor-pointer`}
					/>
				}
				onChange={(e) => setText(e.target.value)}
				onKeyUp={(e) => onEnter(e)}
			/>
		</div>
	)
}

export default Searchbar
