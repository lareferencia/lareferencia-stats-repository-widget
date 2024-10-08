import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Button,
  Card,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { ScopeLabels } from "../../../../../interfaces/stadistics.interface";

interface LevelSelectorProps {
  scopeLabels: ScopeLabels;
  activeScope: string;
  setActiveScope: (scope: string) => void;
}

export const LevelSelector = ({
  scopeLabels,
  activeScope,
  setActiveScope,
}: LevelSelectorProps) => {
  return (
    <Card shadow="sm" mr="4" borderRadius="6" >
      <Menu>
        <MenuButton
          border='none'
          as={Button}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
        >
          {scopeLabels[activeScope as keyof ScopeLabels]}
        </MenuButton>
        <MenuList>
          {scopeLabels &&
            Object.keys(scopeLabels).map((scope) => (
              <MenuItem
                key={scope}
                color="gray.600"
                fontWeight="medium"
                onClick={() => setActiveScope(scope)}
              >
                {scopeLabels[scope as keyof ScopeLabels]}
              </MenuItem>
            ))}
        </MenuList>
      </Menu>
    </Card>
  );
};
