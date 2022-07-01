import { useState } from "react";
import { View, Text, TextInput } from "react-native";

import PrimaryButton from "../../components/buttons/primaryButton/primaryButton.component";
import { linkWithUser } from "../../firebase/firestore";

const LinkUserScreen = () => {
  const [linkUserEmail, setLinkUserEmail] = useState("");

  return (
    <View>
      <Text>Link with a user!</Text>
      <TextInput
        value={linkUserEmail}
        onChangeText={(text) => setLinkUserEmail(text)}
        placeholder='Their Email Address'
      />
      <PrimaryButton
        title='LINK!'
        // onPress={async () => linkWithUser(linkUserEmail).then((res) => dispatch(setLinked(res)))}
      />
    </View>
  );
};

export default LinkUserScreen;
