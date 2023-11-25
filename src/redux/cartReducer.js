const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    case 'INCREMENT_ITEM_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
      case 'DECREMENT_ITEM_QUANTITY':
        return {
          ...state,
          items: state.items.map(item => {
            if (item.id === action.payload) {
              if (item.quantity === 1) {
                return null;
              } else {
                return { ...item, quantity: item.quantity - 1 };
              }
            }
            return item;
          }).filter(Boolean),
        };
        
      default:
        return state;
    }
  };

export default cartReducer;
