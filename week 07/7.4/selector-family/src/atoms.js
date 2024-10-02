import { atomFamily, selectorFamily } from "recoil";
import axios from "axios";

export const todosAtomFamily = atomFamily({
  key: 'todosAtomFamily',
  default: selectorFamily({
    key: "todoSelectorFamily",
    get: id => async () => {
      const res = await axios.get(`https://sum-server.100xdevs.com/todo?id=${id}`);
      return res.data.todo;
    },
  })
});

// In last section we saw use of atomFamily getting data by passing id as argument but the data was an array of objects.

// In this section we will see how to use atomFamily to get data by passing id and get the data from server using selectorFamily.