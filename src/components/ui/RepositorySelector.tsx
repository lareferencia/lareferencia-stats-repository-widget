import { useRef, useState } from "react";
import {
  Box,
  Button,
  Input,
  List,
  ListItem,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
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
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChangeRepository = (repository: Repository) => {
    setSelectedRepository(repository);
    setRefresh(!refresh);
    setSearchTerm("");
    onClose();
  };

  const portalRegional = repositoriesList.find((site) => site.value === "SITEID::1");
  const sortedRepositories = repositoriesList
    .filter((site) => site.value !== "SITEID::1")
    .sort((a, b) => a.label.localeCompare(b.label));
  const repositoriesListSorted = portalRegional
    ? [portalRegional, ...sortedRepositories]
    : sortedRepositories;

  const filtered = repositoriesListSorted.filter((r) =>
    r.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
      placement="bottom-start"
      isLazy
    >
      <PopoverTrigger>
        <Button
          isDisabled={!repositoriesList.length}
          variant="outline"
          rightIcon={<ChevronDownIcon />}
          onClick={isOpen ? onClose : onOpen}
        >
          {selectedRepository.label}
        </Button>
      </PopoverTrigger>
      <PopoverContent w="320px">
        <PopoverBody p={2}>
          <Input
            ref={inputRef}
            placeholder="Buscar repositorio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            size="sm"
            mb={2}
            autoFocus
          />
          <List maxH="320px" overflowY="auto">
            {filtered.map((repository) => (
              <ListItem
                key={repository.value}
                px={3}
                py={2}
                borderRadius="md"
                cursor="pointer"
                bg={selectedRepository.value === repository.value ? "gray.100" : ""}
                _hover={{ bg: "gray.100" }}
                onClick={() => handleChangeRepository(repository)}
                fontSize="sm"
              >
                {repository.label}
              </ListItem>
            ))}
          </List>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default RepositorySelector;
