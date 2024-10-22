import { ReactNode } from 'react';
import LayoutWrapper from './LayoutWrapper'
import TransitionWrapper from './TransitionWrapper'

const Wrappers = ({ children }: { children: ReactNode }) => {
  return (
    <LayoutWrapper>
      <TransitionWrapper>
        { children }
      </TransitionWrapper>
    </LayoutWrapper>
  )
}

export default Wrappers