import { get, groupBy, reject, maxBy, minBy } 
from 'lodash';
import { createSelector } from 'reselect';
import moment from 'moment';
import { 
  ETHER_ADDRESS,
  GREEN,
  RED,
  ether,
  tokens,
  formatBalance
} from '../helpers';

export const accountSelector = state => get(
	state, 'web3.account');


export const web3Selector = state => get(
	state, 'web3.connection');

export const tokenLoadedSelector = state => get(
	state, 'token.loaded', false);

export const tokenSelector = state => get(
	state, 'token.contract');

export const exchangeLoadedSelector = state => get(
	state, 'exchange.loaded', false);

export const exchangeSelector = state => get(
	state, 'exchange.contract');

export const contractsLoadedSelector = createSelector(
  tokenLoadedSelector,
  exchangeLoadedSelector,
  (tl, el) => (tl && el)
);

// All Orders
const allOrdersLoaded = state => get(
  state, 'exchange.allOrders.loaded', false);
const allOrders = state => get(
  state, 'exchange.allOrders.data', []);

// Cancelled orders
export const cancelledOrdersLoadedSelector = state => get(
  state,
  'exchange.cancelledOrders.loaded',
  false
 );

export const cancelledOrdersSelector = state => get(
  state, 
  'exchange.cancelledOrders.data', 
  []
 );

// Filled Orders
export const filledOrdersLoadedSelector = state => get(
  state, 
  'exchange.filledOrders.loaded', 
  false
 );

const filledOrders = state => get(
  state, 
  'exchange.filledOrders.data', 
  []
 );
export const filledOrdersSelector = createSelector(
  filledOrders,
  (orders) => {
    // Sort orders by date ascending 
    // for price comparison
    orders = orders.sort(
      (a,b) => a.timestamp - b.timestamp);
    // Decorate the orders
    orders = decorateFilledOrders(orders);
    // Sort orders by date descending 
    // for display
    orders = orders.sort(
      (a,b) => b.timestamp - a.timestamp);
    return orders;
  }
);

const decorateFilledOrders = (orders) => {
  // Track previous order to compare history
  let previousOrder = orders[0];
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateFilledOrder(
        order, previousOrder);
      // Update the previous order 
      // once it's decorated
      previousOrder = order; 
      return order;
    })
  );
};

const decorateOrder = (order) => {
  let etherAmount;
  let tokenAmount;

  if(order.tokenGive === ETHER_ADDRESS) {
    etherAmount = order.amountGive;
    tokenAmount = order.amountGet;
  } else {
    etherAmount = order.amountGet;
    tokenAmount = order.amountGive;
  }

  // Calculate token price to 9 decimal places
  const precision = 1000000000;
  let tokenPrice = (etherAmount / tokenAmount);
  tokenPrice = Math
  .round(tokenPrice * precision) / precision;

  return({
    ...order,
    etherAmount: ether(etherAmount),
    tokenAmount: tokens(tokenAmount),
    tokenPrice,
    formattedTimestamp: moment.unix(
      order.timestamp).format('h:mm:ss a M/D')
  });
};

const decorateFilledOrder = (order, previousOrder) => {
  return({
    ...order,
    tokenPriceClass: tokenPriceClass(
      order.tokenPrice, order.id, previousOrder)
  });
};

const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
  // Show green price if only one order exists
  if(previousOrder.id === orderId) {
    return GREEN;
  }

  // Show green price if order price 
  // higher than previous order
  // Show red price if order price 
  // lower than previous order
  if(previousOrder.tokenPrice <= tokenPrice) {
    return GREEN; // success
  } else {
    return RED; // danger
  }
};

const openOrders = state => {
  const all = allOrders(state);
  const filled = filledOrders(state);
  const cancelled = cancelledOrders(state);

  const openOrders = reject(all, (order) => {
    const orderFilled = filled.some(
      (o) => o.id === order.id);
    const orderCancelled = cancelled.some(
      (o) => o.id === order.id);
    return(orderFilled || orderCancelled);
  });

  return openOrders;
};


export const orderBookLoadedSelector = state => cancelledOrdersLoadedSelector(state) &&
  filledOrdersLoadedSelector(state) &&
   allOrdersLoaded(state);

// Create the order book
export const orderBookSelector = createSelector(
  openOrders,
  (orders) => {
    // Decorate orders
    orders = decorateOrderBookOrders(orders);
    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType');
    // Fetch buy orders
    const buyOrders = get(orders, 'buy', []);
    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort(
        (a,b) => b.tokenPrice - a.tokenPrice)
    };
    // Fetch sell orders
    const sellOrders = get(orders, 'sell', []);
    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort(
        (a,b) => b.tokenPrice - a.tokenPrice)
    };
    return orders;
  }
);

const decorateOrderBookOrders = (orders) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateOrderBookOrder(order);
      return(order);
    })
  );
};

const decorateOrderBookOrder = (order) => {
  const orderType = (order.tokenGive === ETHER_ADDRESS ?
   'buy' : 'sell');
  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ?
     GREEN : RED),
    orderFillAction: (orderType === 'buy' ?
     'sell' : 'buy')
  });
};

export const myFilledOrdersLoadedSelector = createSelector(
  filledOrdersLoadedSelector, loaded => loaded);

export const myFilledOrdersSelector = createSelector(
  accountSelector,
  filledOrders,
  (account, orders) => {
    // Find our orders
    orders = orders.filter(
      o =>return( (o.user === account) ||
       (o.userFill === account)));
    // Sort by date ascending
    orders = orders.sort(
      (a,b) => a.timestamp - b.timestamp);
    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(
      orders, account);
    return orders;
  }
);

const decorateMyFilledOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateMyFilledOrder(
        order, account);
      return order;
    })
  );
};

const decorateMyFilledOrder = (order, account) => {
  const myOrder = order.user === account;

  let orderType;
  if(myOrder) {
    orderType = (order.tokenGive === ETHER_ADDRESS ? 
    'buy' : 'sell');
  } else {
    orderType = (order.tokenGive === ETHER_ADDRESS ? 
      'sell' : 'buy');
  }

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ?
     GREEN : RED),
    orderSign: (orderType === 'buy' ? '+' : '-')
  });
};

export const myOpenOrdersLoadedSelector = createSelector(
  orderBookLoadedSelector, loaded => loaded);

export const myOpenOrdersSelector = createSelector(
  accountSelector,
  openOrders,
  (account, orders) => {
    // Filter orders created by current account
    orders = orders.filter(
      (o) => o.user === account);
    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders);
    // Sort orders by date descending
    orders = orders.sort(
      (a,b) => b.timestamp - a.timestamp);
    return orders;
  }
);

const decorateMyOpenOrders = (orders, account) => {
  return(
    orders.map((order) => {
      order = decorateOrder(order);
      order = decorateMyOpenOrder(order, account);
      return(order);
    })
  );
};

const decorateMyOpenOrder = (order, account) => {
  let orderType = (order.tokenGive === ETHER_ADDRESS ? 
    'buy' : 'sell');

  return({
    ...order,
    orderType,
    orderTypeClass: (orderType === 'buy' ? GREEN : RED)
  });
};

export const priceChartLoadedSelector = createSelector(
  filledOrdersLoadedSelector, loaded => loaded);

export const priceChartSelector = createSelector(
  filledOrders,
  (orders) => {
    // Sort orders by date ascending 
    // to compare history
    orders = orders.sort(
      (a,b) => a.timestamp - b.timestamp);
    // Decorate orders - add display attributes
    orders = orders.map((o) => decorateOrder(o));
    // Get last 2 order for 
    // final price & price change
    let secondLastOrder, lastOrder;
    [secondLastOrder, lastOrder] = orders.slice(
      orders.length - 2, orders.length);
    // get last order price
    const lastPrice = get(
      lastOrder, 'tokenPrice', 0);
    // get second last order price
    const secondLastPrice = get(
      secondLastOrder, 'tokenPrice', 0);

    return({
      lastPrice,
      lastPriceChange: (lastPrice >= secondLastPrice ?
       '+' : '-'),
      series: [{
        data: buildGraphData(orders)
      }]
    });
  }
);

const buildGraphData = (orders) => {
  // Group the orders by hour for the graph
  orders = groupBy(
    orders,
    (o) => moment.unix(o.timestamp)
    .startOf('hour').format());
  // Get each hour where data exists
  const hours = Object.keys(orders);
  // Build the graph series
  const graphData = hours.map(
    (hour) => {
    // Fetch all the orders from current hour
    const group = orders[hour];
    // Calculate price values 
    // - open, high, low, close
    // first order
    const open = group[0]; 
    // high price
    const high = maxBy(group, 'tokenPrice');
    // low price 
    const low = minBy(group, 'tokenPrice');
    // last order 
    const close = group[group.length - 1];

    return({
      x: new Date(hour),
      y: [
         open.tokenPrice,
         high.tokenPrice,
         low.tokenPrice,
         close.tokenPrice
         ]
    });
  });

  return graphData;
};

export const orderCancellingSelector = state => get(
  state, 'exchange.orderCancelling', false);

export const orderFillingSelector = state => get(
  state, 'exchange.orderFilling', false);

// BALANCES
export const balancesLoadingSelector = state => get(
  state, 'exchange.balancesLoading', true);

const etherBalance = state => get(state, 'web3.balance', 0);
export const etherBalanceSelector = createSelector(
  etherBalance,
  (balance) => {
    return formatBalance(balance);
  }
);

const tokenBalance = state => get(state, 'token.balance', 0);
export const tokenBalanceSelector = createSelector(
  tokenBalance,
  (balance) => {
    return formatBalance(balance);
  }
);

const exchangeEtherBalance = state => get(state, 'exchange.etherBalance', 0);
export const exchangeEtherBalanceSelector = createSelector(
  exchangeEtherBalance,
  (balance) => {
    return formatBalance(balance);
  }
);

const exchangeTokenBalance = state => get(state, 'exchange.tokenBalance', 0);
export const exchangeTokenBalanceSelector = createSelector(
  exchangeTokenBalance,
  (balance) => {
    return formatBalance(balance);
  }
);

export const etherDepositAmountSelector = state => get(
  state, 'exchange.etherDepositAmount', null);

export const etherWithdrawAmountSelector = state => get(
  state, 'exchange.etherWithdrawAmount', null);

export const tokenDepositAmountSelector = state => get(
  state, 'exchange.tokenDepositAmount', null);

export const tokenWithdrawAmountSelector = state => get(
  state, 'exchange.tokenWithdrawAmount', null);

export const buyOrderSelector = state => get(state, 'exchange.buyOrder', {});

export const sellOrderSelector = state => get(state, 'exchange.sellOrder', {});
