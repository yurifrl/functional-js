const { createItem } = require('item')
const { discountResolver } = '...'
const validate = isLikeThis({ name: 'String', value: 'Number' })
const add = () => '...'

// No Injection
// { String, String } -> IO
const Carrinho = compose(
  add,
  validateState,
  applyShipments(shipmentResolver),
  applyDiscounts(discountResolver),
  mergeToState,
  createItem,
  validate
)
map(Carrinho, [ { name: 'Banana', value: '2.00' } ])


// ........................................
// With Injection
// Discount -> Item -> IO
const Carrinho = (discount, shipment) = compose(
  add,
  validateState,
  applyShipments(shipment),
  applyDiscounts(discount),
  mergeToState,
)
map(Carrinho(discountResolver), [ Item({ name: 'Banana', value: '2.00' }) ])
