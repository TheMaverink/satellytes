const getSpaceOnString = (name) => {
    let spaces = "";
    for (let i = 0; i < 24 - name.length; i++) spaces += "\xa0";
    return spaces;
  };

  export default getSpaceOnString // test