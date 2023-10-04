import { 
  createContext,
  useReducer 
} from "react";

export const ConstructorContext = createContext(null);
export const BurgerContext = createContext(null);
export const OrderContext = createContext(null);
export const OrderDispatchContext = createContext(null);

export function ContextProvider({ children }) {    
  const [order, dispatchOrder] = useReducer(
    orderReduser,
      {
        name: '',
        order: {
          number: ''
        },
        isLoaded: false
      }
    );
  const [burger, dispatchBurger] = useReducer(
    burgerReduser,
      {
        bun: null,
        ingredients: []
      }
    );

  return (
    <ConstructorContext.Provider value={burger}>
      <BurgerContext.Provider value={dispatchBurger}>
        <OrderContext.Provider value={order}>
          <OrderDispatchContext.Provider value={dispatchOrder}>
            {children}
          </OrderDispatchContext.Provider>
        </OrderContext.Provider>
      </BurgerContext.Provider>
    </ConstructorContext.Provider>
  );
}

function orderReduser(order, action) {
  switch (action.type) {
    case 'addOrder': {
      return {
        name: action.payload.name,
        order: {
          number: action.payload.order.number
        },
        isLoaded: action.payload.isLoaded
      };
    }
      default: {
        throw Error('Unkown action: ' + action.type)
    }
  }
};

function burgerReduser(burger, action) {
  switch (action.type) {
    case 'addIngredient': {
      return {
        ...burger,
        ingredients: [
          ...burger.ingredients,
          action.payload
        ]
      };
    }
    case 'addBun': {
      if (!burger.bun) {
        return {
          ...burger,
          bun: action.payload
        };
      }
      else {
        if (burger.bun._id === action.payload._id) {
          return {
            ...burger
          };
        }
        else {
          return {
            ...burger,
            bun: action.payload
          };
        }
      }
    }
    default: {
      throw Error ('Unkown action: ' + action.type);
    }
  }
};