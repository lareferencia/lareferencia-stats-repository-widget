import { Button, Card, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons'
import { ScopeLabels } from '../../../interfaces/stadistics.interface';
import { DEFAULT_SCOPES_KEYS } from '../../../config';

type ScopeButtonsProps = {
    scopeLabels: ScopeLabels;
    activeScope: string;
    setActiveScope: (value: string) => void;
};
const scopes = DEFAULT_SCOPES_KEYS;


export const ScopeButtons = ({ activeScope, setActiveScope, scopeLabels }: ScopeButtonsProps) => {


  return (
    
    <Card shadow='sm' borderRadius='12' p='3' display='flex' gap='8' mt='1rem' flexWrap='wrap'>
        <Menu>
          <MenuButton as={ Button } rightIcon={<ChevronDownIcon />} size='sm' variant='ghost' >
            { scopeLabels[activeScope as keyof ScopeLabels]}
          </MenuButton>
          <MenuList>
            { scopes.map((label: string, index: number) => (
              <MenuItem key={index} onClick={() => setActiveScope(label)} fontSize='sm'>
                {scopeLabels[label as keyof ScopeLabels]}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
    </Card>
  )
}
