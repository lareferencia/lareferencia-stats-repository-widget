import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import { TFunction, i18n } from "i18next";
import { GrLanguage } from "react-icons/gr";

type Props = {
  i18n: i18n;
  t: TFunction;
};
const LangSelector = ({ i18n, t }: Props) => {
  const languagues = ["es", "en", "pt"];

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  return (
    <Box display="flex" alignItems="center">
      <GrLanguage />
      <Menu>
        <MenuButton as={Button} variant="ghost" rightIcon={<ChevronDownIcon />}>
          {t(i18n.language)}
        </MenuButton>
        <MenuList>
          {languagues.map((lang) => (
            <MenuItem key={lang} onClick={() => changeLanguage(lang)}>
              {t(lang)}
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Box>
  );
};

export default LangSelector;
