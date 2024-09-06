import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Repository } from "../../interfaces/repository.interface";

type Props = {
  repositoriesList: Repository[];
  selectedRepository: Repository;
  setSelectedRepository: (repository: Repository) => void;
  setRefresh: (refresh: boolean) => void;
  refresh: boolean;
};
const RepositorySelector = ({
  repositoriesList,
  selectedRepository,
  setSelectedRepository,
  refresh,
  setRefresh,
}: Props) => {


  const handleChangeRepository = (repository: Repository) => {
    setSelectedRepository(repository);
    setRefresh(!refresh);
  };

  const portalRegional = repositoriesList.find(site => site.value === 'SITEID::1');
  const sortedRepositories = repositoriesList.filter(site => site.value !== 'SITEID::1').sort((a, b) => a.label.localeCompare(b.label));
  const repositoriesListSorted = portalRegional ? [portalRegional, ...sortedRepositories] : sortedRepositories;
  

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
        {repositoriesListSorted.map((repository) => (
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

export default RepositorySelector;