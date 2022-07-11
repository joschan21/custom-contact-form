import { FC, useRef } from 'react'
import { motion } from 'framer-motion'

interface ProgressBarProps {
  percentFilled: number
}

const ProgressBar: FC<ProgressBarProps> = ({ percentFilled }) => {
  return (
    <div className='w-full h-2 bg-gray-200 rounded-full overflow-hidden'>
      <motion.div
        style={{ originX: 0 }}
        animate={{ scaleX: percentFilled }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className='w-full h-full bg-indigo-600 rounded-full'
      />
    </div>
  )
}

export default ProgressBar
