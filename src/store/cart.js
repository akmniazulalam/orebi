import { create } from "zustand";
import { persist } from "zustand/middleware";

const useCart = create(
  persist(
    (set) => ({
      items: [], // ekhane jehetu eta ekta array tai jekhanei ei items ke update kora hobe sekhanei array ke return korte hobe. nahole ekhane array er jaygay onno kichu chole ashbe. ekhane jodi array na hoye object hoto tahole object return korte hoto.
      addToCart: (product) =>
        set((state) => {
          // ekhane find ekta array er moddhe loop chaliye condition match kora just specific ekta item ke return kore. array ke na. ekhane find e id diye khuja hocche kintu oi id er puro object takei return kore. find() muloto condition match kora puro element takei return kore.
          const existingItem = state.items.find(  
            (item) => (item._id || item.id) === (product._id || product.id),
          );
          if (existingItem) {
            return {
              // ekhane map ekta array er moddhe loop chaliye ekta array return kore. specific item ke na.
              // ekhane abaro map chaliye array update kora hocche. zustand e purono je state ta ache mane ekhane jemon items er vitorer object gulo ache seguloke direct modify kora jayna. tai abar notun object baniye notun array return kore state update korte hocche. ar items ke update kora hocche mane emon vabe update korte hobe jeno ager jei item gulo chilo already segulo jeno thik thake. karon ekhane items ke return korle ekdom notun ekta array hoye jabe jetar sathe ager items array er kono mil thakbena. tai else e sob somoy item rakhte hobe ba array ba object e ... spread operator diye ager gulokeo rekhe dite hobe.
              items: state.items.map((item) =>
                (item._id || item.id) === (product._id || product.id)
                  ? {
                      ...item, // ekhane ekta notun item object banano hocche jekhane existing item er shudhu quantity take update kora hocche tai notun kore object banano hocche. kintu shudhu jodi quantity update er code dewa hoy tahole quantity e thakbe object er moddhe. baki name, price etc. hariye jabe. tai ...item diye ager property guloke rakha hocche.
                      quantity: item.quantity + 1,
                    }
                  : item,
              ),
            };
          } else {
            return {
              items: [...state.items, { ...product, quantity: 1 }], // jodi kono product age theke exist na kore tahole ekta notun item ba ekhane object arki push hobe. ...state.items mane hocche ager jei product object gulo chilo seguloke rekhe notun arekta product object add korbe ba push korbe array te. ar oi object e product er sob data thakbe ar quantity ta 1 rekhe add hobe.
            };
          }
        }),
      removeFromCart: (id) =>
        set((state) => ({ // ekhane () er moddhe rakhar karon hocche return kora. () na dile { return {}} evabe likhte hoto. return kortei hobe nahole state ta change hobena items.
          items: state.items.filter((item) => (item._id || item.id) !== id), // ekhane filter array er moddhe jei item ta te remove button click kora hoyeche setar id take chara baki joto item ache seguloke niye ekta array return kore. filter() muloto condition matching items er array return kore ar find() just ekta single item ke return kore. filter korle array er length kome jay. kintu map chalale array er length kome na ba bareo na. jotogulo item input array te thake totoguloi item output array teo thake. length ek e thake just condition match na kora item er khetre undefined bole dey. ar filter just condition matching items er array return kore length ke komiye dey.
        })),
      increaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) => // map() sob somoy array er jonno notun array return kore.
            (item._id || item.id) === id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                }
              : item,  // ekhane bepar ta emon hocche je jei id tar sathe ekhankar array er id milbe setar quantity ek barabe kintu map jehetu ekdom notun array return kore tai je id gulo milbena sei id guloke undefined kore dibe. karon map normally jei koyta input item thake thik sei koytai output item rekhei notun array return kore. tai else e item dite hobe. ete kore jei id gulo milbena segulo jemon vabe ache temon e rekhe dibe ar notun array return korbe.
          ),
        })),
      decreaseQuantity: (id) =>
        set((state) => ({
          items: state.items.map((item) =>
            (item._id || item.id) === id && item.quantity > 1
              ? {
                  ...item,
                  quantity: item.quantity - 1,
                }
              : item,
          ),
        })),
    }),
    { name: "cart-storage" }, // ekhane name mane hocche localStorage e kon key naame data save hobe. key ta name e likhte hobe. persist middleware use korleo name na dile Zustand kaaj korbe na. karon persist er minimum configuration hishebe name lagei. eta na dile localstorage e save hobena. error ashte pare. karon zustand to jante hobe kon key naame localstorage e save hobe.
  ),
);

export default useCart;
