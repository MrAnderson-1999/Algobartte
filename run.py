from ib_insync import *
import time

def connect_to_ibkr():
    ib = IB()
    try:
        ib.connect(host='127.0.0.1', port=7497, clientId=1)
        return ib
    except Exception as e:
        print("ERROR CONNECTING TO IBKR:\n" + str(e))

# def get_ticket_price(exchange_instance):
#     contract = get_contract()
#     if isinstance(exchange_instance, IB):
#         exchange_instance.qualifyContracts(contract)
#         data = exchange_instance.reqMktData(contract)
#         data = data.marketPrice()
#     return data

def set_contract(ticker_name='NFLX',exchange_name='SMART',currency_name='USD'):
    if ticker_name=='NFLX'and exchange_name=='SMART'and currency_name=='USD':
        answer = input("Using the defualts of CONTRACT_TICKER data, press y/n to continue\n")
        if answer == 'y':
            contract = Stock(ticker_name,exchange_name,currency_name)
    contract = Stock(ticker_name,exchange_name,currency_name)
    return contract
def set_order(action='BUY', units=50):
    if action == 'BUY'and units == 50:
        answer = input("Using the defualts of SET_ORDER data, press y/n to continue\n")
        if answer == 'y':
            order = MarketOrder(action, units)
    order = MarketOrder(action, units)
    return order

def is_Active(trade):
    for _ in range(100):
        if not trade.isActive():
            print(f'Your order status - {trade.orderStatus.status}')
            return True
        print("not yet")
        time.sleep(0.5)
    return False
def order_status(trade):
    if trade.orderStatus.status == 'Filled':
        fill = trade.fills[-1]
        
        print(f'{fill.time} - {fill.execution.side} {fill.contract.symbol} {fill.execution.shares} @ {fill.execution.avgPrice}')

def place_order(exchange_instance,contract, order):
    trade = exchange_instance.placeOrder(contract, order)
    return trade
     
def start_trade(ibkr):
    order = set_order()
    contract = set_contract()
    trade = place_order(ibkr, contract, order)
    trade.filledEvent+= order_status


# ib = IB()
# try:
#     ib.connect(host='127.0.0.1', port=7497, clientId=1)
# except Exception as e:
#     print("ERROR CONNECTING TO IBKR:\n" + str(e))

# contract = Stock('NFLX','SMART','USD')
# order = MarketOrder('BUY', 7)
# trade = ib.placeOrder(contract, order)
# trade.filledEvent += order_status

ibkr = connect_to_ibkr()
start_trade(ibkr)









# ibkr = connect_to_ibkr()
# start_trade(ibkr)
# print(trade.log)
# print(trade.orderStatus.status)
# print(data.marketPrice())

def connect_to_db():
    pass

def action_sell():
    pass
