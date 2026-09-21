---
external: false
title: Sell Options for living, the complete beginner’s guide to the wheel strategy
description: Everything you need to know to effectively sell options for living
date: 2021-03-20
---

**Instead of playing at the casino, become one.**

Let's start with the an introduction, I’m the creator of [TradeIV](https://tradeiv.com), a trading assistance app for traders that runs in your browser. I've been trading stocks/options/crypto for about six years. Like most traders, I’ve dabbled with multiple trading strategies throughout the years: day trading (multiple time frames), swing trading, gambling with 0 DTE options, and I was quite frustrated with the suboptimal outcome of each strategy. It was early last year when I discovered the wheel strategy with options, and I'm happy to say that I’ve achieved around 80 to 90% win rate since I started this strategy. So in this article I would like to give back to the community by sharing with you what I learned and discuss the strategies that I've been using to have this level of success.

## Basics of Options

If you‘re a complete beginner, I'd like to give you a quick run down about options (advanced traders can skip this part). An options is a derivative for a particular stock, when you buy an option you are purchasing the right but not the obligation to purchase 100 shares of the underlying stock.

Options should be used as a way to hedge your stock positions. Let's look at an example: Apple is trading at $100 dollars per share right now, and you have a hundred shares of Apple stocks in your possession ($100x 100 = $10,000), you worry that Apple might go down $20 by the end the week, So how can you hedge your position? Well what you can do is to buy a Put option to offset your potential losses. A put option gives you the right but not the obligation to sell a stock at a specific price. With the example above if you think Apple will go down $20 by the end of the week, you can buy a put option for the right to sell your Apple stock at 100 dollars each, think of this as an insurance policy: if Apple does go down 20 bucks then it'll be worth $80 per share, you would lose $2000 from your 100 shares position (100 shares X $20 = $2000). Now let’s say you bought that Put option as an insurance, you can now sell your Apple stock at $100 each even when the stock is currently trading at $80/share, therefore the amount of money you lose is greatly diminished! Your only loss is the premium you paid to buy that Put option.

Now when you buy a put option there’s always somebody on the other side of the trade who sells you this put option who you pay a small sum of money to provide protection for your position. Now, what happens if Apple doesn't go down 20 bucks? Well the only thing you lose is the premium you paid to the seller!

---

**Cash Secured Puts** or CSP, this is when you sell a PUT option by putting up collateral for 100 shares of the underlying stock. If the stock trades at below your strike price, your collateral is released and you’re forced to buy the stock at a higher price than what it’s currently trading for at a loss.

![Cash Secured Puts](/images/csp.webp)

**Covered Call** or CC, the exact opposite of CSP, you sell a CALL option by putting up 100 shares of the stock as collateral (you need to own 100 shares of the stock to begin with in order to sell CC). If the stock trades ABOVE your strike price by expiration, you’ll be forced to sell 100 shares of the stock and giving up potential profits by selling at your strike price and not at the higher market value.

![Covered Call](/images/coveredcall.webp)

## The Wheel Strategy

Our strategy involves us selling options for income! A great analogy for this strategy is an insurance business, because if you think about it, selling options is exactly what an insurance business is. You are selling a service to protect the buyer from downside risks, if stock doesn't go down then you pocket the premium for free. No strategy is risk-free so if the stock does go down past your strike price, you’ll take the full risk of taking that loss for the buyer. However our strategy will go into details about how we can avoid that and how to minimize your risks. In a way, our only job is to become the risk manager of the insurance business.

What is the wheel strategy? The wheel strategy can sometimes be referred to as the Triple Income Strategy, so it's natural that there are three parts to it:

1. You sell a Cash Secured Put on a stock (collect $$), if stock stays ABOVE your strike price by expiration, you keep the premium and done! Repeat step 1.
2. In the unlikely event that you get assigned 100 shares of the stock, You turn around and sell Covered Calls on it (collect $$)
3. The strike price of the cover call is ideally above the Assigned price of the stock by expiration and your 100 shares get called away(collect the difference)

Here's a real world example from one of my trades:

![Fastly $FSLY stock](/images/fsly.webp)

**$FSLY** Is currently trading at $70/share, I decided to sell a Cash Secured Put for $66 strike price, I put up $6600 and collected a profit of $100 from the sale. At the end of the week $FSLY traded at $65, Which is below our strike price so we get assigned 100 shares of $FSLY at the end of the week for total cost of $6500. Come Monday, $FSLY started the week trading at $65/share, we then sell a Cover Call for $FSLY set to expire at the end of the week at the $70 strike, we received a premium of $70 for selling that covered call. Fast forward to the end of the week $FSLY traded at $71/share, that is above our strike price, so our option got called away. Our wheel trade is now complete.

The total profit from this trade is: $100 (when we sold the CSP at the start) + $70 (when we sold the Covered Call) + 400(FSLY price when our CC got called away minus our assignment price $7000–6600) = **$570**

I hope you see the beauty of this strategy because you are making money every step of the way by selling insurance contracts to willing buyers.

## Stock Selection and Requirements

High risk high reward could not be any more true when it comes to the wheel strategy. It's **extremely important** to pick stocks that are within your risk tolerance level. In the above example, **$FSLY** It's a relatively high-growth company with a high **beta**, Beta is a value assigned to a stock that describes how volatile the stock can move compared to the S&P, the higher the beta the more volatile the stock. When stocks have high volatility the premiums you get on your options will be higher. If you think about it, from the perspective of an insurance business, if you are a bad driver and wrecked your car a few times, then the insurance company may charge you more every month compared to a good driver. So it's really important for you to experiment and find stocks with relatively safe betas.

Here's how I select my stocks

1. I like to find stocks that are trading near their previous support. The only timeframe I look at for stocks are the daily chart. Ideally, I want to see the stock that are beaten down due to no news (due to market wide down turn), and the price of the stock is trading near their previous support level.

![Plug Power $PLUG stock](/images/plugstock.webp)

2. The stock must be in an overall uptrend, if you zoom out on the stock, it must be in a generally uptrend direction.

3. Next Earning date for the stock must not coincide with the options expiration date. During earnings a stock can go wildly up-and-down and you're very likely to get assigned on the stock. The premium may be very high and very good for you but the risks are much higher than normal.

4. The stock must be a company that I don't mind holding a hundred shares with for a long time. The company needs to be a good company with actual products and services, have good EPS, and what’s even better is they have positive cash flow and profitable. You only want to sell options of profitable companies rather than meme stocks. Now I do make exceptions for this rule on companies that I know well, for example Fastly ($FSLY). Companies that you are bullish for the long-term.

5. My last requirement is my option’s expiration date is never longer than two weeks, and my Delta is always .20 or below

## A brief guide on Options Greeks

![$FSLY Options chain](/images/fslyoptionschain.webp)

We only really care about two Greeks on an option:

**Delta** is how much the option’s price will go up when the underlying stock go up $1. For us sellers, Delta can be used to calculate the rough probability this option will go worthless. In the above example, the probability of us making money when we sell this option is 1–0.50 = 0.5 or 50% chance.

**Theta** this is where the term #thetagang comes from. As option sellers, Theta is our friend. Theta is how much this option will lose its value by in a single day given the price of the stock doesn’t move. The higher the theta the better!

### Risks

The wheel strategy is not completely risk-free, there are scenarios where it can go completely wrong where you are forced to bag hold 100 shares of the stock for really long time.

Let's talk about the ideal situation, the ideal situation is when you sell a cash secure put on a stock, the stock does not go below the strike price on expiration day and you pocket the premium and the trade is done. You can repeat this for however long you want and keep making premium from buyers. With this strategy you make money when to stock go up, you make money when to side ways and you also make money when the stock goes slightly down as long as it doesn’t go pass your strike price.

So what happens when the stock takes a huge dump way past your strike price? Remember what I say the previous section about willing to own the stock for really long time in case it goes wrong? When you get assigned on a stock at a much higher price than its current price, you have no choice but to hold the stock for a really long time and try to sell covered calls on it to reduce your initial cost. Your hope is to patiently wait for the stock to come back up to your initial assignment price. A recently example would be Lordstown Motors $RIDE, they were hit with a short seller report on their company and the stock dropped over 50%. If you sell CSP on the stock at, let’s say $25, you just lost big on it. You have no choice but to hold the stock and wait for it to come back up. Not all stocks will come back up, because some may go bankrupt!

![$RIDE bankrupt](/images/ride.webp)

## Capital Requirements

The old saying about it takes money to make money is absolutely a requirement for this strategy. In order to make a good income from this strategy you’ll need to have a large initial capital. At any given week I have about five or six wheels running and my goal is to make about $500-$1000 a week. Now if you have a smaller accounts you can still do the wheel but you are only limited to stocks with lower prices because when you sell a Cash Secured Put, you need to put up the capital as collateral, so if you sell a CSP on a stock that's worth $50/share , you’ll need to put up $5000 as collateral. So if you only have $5000 in accounts, the maximum you can make is one position premium per week. The other ways to make money from premiums with small accounts is via spreads, but that's the story for another day.

## FAQ

_This post blew up on Reddit, so I’ll take some common questions and my answers from that thread here._

**What do you recommend to research stocks with?**

I recommend any website/apps that lets you look at the chart really quickly and can give you all the information about stocks really quickly. For that reason I recommend TradeIV. (disclaimer, I built the app)

**Why not sell options on high flying/meme stocks?**

You can! But you are likely going to get assigned on these, so prepared to hold them for a really long time if the the stock tanks. There’s a nice scanner widget on the TradeIV app to find stocks with high IV and high premiums

![high premium stock filter from TradeIV](/images/highiv.webp)

**Why not sell options into earnings?**

You definitely can, but stocks usually fluctuate wildly going in and out of earnings, your strike price can easily get surpassed during an earnings, always weigh in on proper risk/reward ratio before you trade.

**When do you close the position early vs letting them expire worthless?**

I usually let the option go expire worthless to pocket the full premium, but on occasion, if there’s a breaking news happening and I think the stock market will tank for the next few days, I would close out of my positions early, usually at 80–90% profit.

**How can I do this on a small account (< $10,000)?**

I wouldn’t recommend doing this strategy with < $10,000 in your account, but if you do want to test it, you may run the wheel on cheaper stocks, stocks that are less than $10. Your returns won’t be that much at all, but it’ll be good practice. Furthermore, you may look into Options Spreads, they are higher risk but will enable you to make good thetagang income from selling options.

**What happens when the market take a giant dump way beyond your CSP strike?**

Always always have a plan, whenever you enter into a CSP to begin the wheel, always know that this position can be assigned should the market take a giant dump. That’s why I advocate running the wheel on good companies or companies you are comfortable with, so when you inevitably get assigned, it won’t be a surprise for you because it was all part of your plan.

## Conclusion

I hope you find this article useful and as always I'm always here to help you with anything you need. You can find me on Twitter or Discord and you can always follow my wheel trading journey on YouTube or my live trading sheet

Disclaimer: I am not a registered financial advisor, everything I mentioned in this article is not to be taken as investment advice. TradeIV was created by me and is meant to be an app to help you gather information about stocks, it is not meant to be a replacement for your investment advisor.
