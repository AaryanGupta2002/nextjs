// Nextjs/corrtn/src/utils/calculateCorrelation.ts
import { pl } from 'nodejs-polars';

export async function calculateCorrelation(company1: string, company2: string): Promise<number> {
  if (typeof window !== "undefined") {
    throw new Error("This function can only be called on the server side.");
  }
// Load CSV files for each company (monthly resampled data)
  const df1 = await pl.readCSV(`monthwisecsvfilepath/${company1}.csv`);
  const df2 = await pl.readCSV(`monthwisecsvfilepath/${company2}.csv`);

  // Calculate monthly profit/loss for company 1 (close - open)
  const df1WithProfitLoss = df1.withColumn(
    pl.col("close").sub(pl.col("open")).alias("profit_loss_1")
  );

  // Calculate monthly profit/loss for company 2 (close - open)
  const df2WithProfitLoss = df2.withColumn(
    pl.col("close").sub(pl.col("open")).alias("profit_loss_2")
  );

  const df1Selected = df1WithProfitLoss.select("date", "profit_loss_1");
  const df2Selected = df2WithProfitLoss.select("date", "profit_loss_2");

  const joinedDf = df1Selected.join(df2Selected, { on: "date", how: "inner" });

  // Calculate Pearson correlation on 'profit_loss_1' and 'profit_loss_2' columns
  const correlationExpr = pl.pearsonCorr("profit_loss_1", "profit_loss_2");

  // Execute the expression and extract the result as a scalar
  const resultDf = joinedDf.select(correlationExpr);
  const correlation = resultDf.row(0)[0]; // Extract the first value from the first row

  return correlation;
}