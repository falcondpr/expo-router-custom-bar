import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";

type AntDesignIconProps = Omit<
  React.ComponentProps<typeof AntDesign>,
  "name"
>;
type EntypoIconProps = Omit<
  React.ComponentProps<typeof Entypo>,
  "name"
>;

export type IconKey = "index" | "explore" | "create" | "profile";

type IconFunction = (
  props: AntDesignIconProps | EntypoIconProps
) => JSX.Element;

export const icons: Record<IconKey, IconFunction> = {
  index: (props: AntDesignIconProps) => (
    <AntDesign name="home" size={26} {...props} />
  ),
  explore: (props: EntypoIconProps) => (
    <Entypo name="compass" size={26} {...props} />
  ),
  create: (props: AntDesignIconProps) => (
    <AntDesign name="pluscircleo" size={24} {...props} />
  ),
  profile: (props: AntDesignIconProps) => (
    <AntDesign name="user" size={24} {...props} />
  ),
};
