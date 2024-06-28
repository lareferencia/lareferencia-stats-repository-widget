import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Repository } from "../interfaces/repository.interface";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useEffect } from "react";

type Props = {
  repositoriesList: Repository[];
  selectedRepository: Repository;
  setSelectedRepository: (repository: Repository) => void;
  setRefresh: (refresh: boolean) => void;
  refresh: boolean;
};
export const RepositorySelector = ({
  repositoriesList,
  selectedRepository,
  setSelectedRepository,
  refresh,
  setRefresh,
}: Props) => {
  useEffect(() => {}, []);

  const handleChangeRepository = (repository: Repository) => {
    setSelectedRepository(repository);
    setRefresh(!refresh);
  };

  return (
    <Menu>
      <MenuButton
        isDisabled={!repositoriesList.length}
        as={Button}
        variant="outline"
        rightIcon={<ChevronDownIcon />}
      >
        {selectedRepository.label}
      </MenuButton>
      <MenuList>
        {repositoriesList.map((repository) => (
          <MenuItem
            bg={`${
              selectedRepository.value === repository.value ? "gray.100" : ""
            }`}
            _hover={{ bg: "gray.100" }}
            key={repository.value}
            onClick={() => handleChangeRepository(repository)}
          >
            {repository.label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};
