import connectDB from "@/app/lib/db"

export async function GET() {
    const db = await connectDB();
  try {
    const currentMonth = new Date()
    const previousMonth = new Date()
    previousMonth.setMonth(currentMonth.getMonth() - 1)

    const firstDayThisMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1)
    const lastDayThisMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0)

    const firstDayLastMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth(), 1)
    const lastDayLastMonth = new Date(previousMonth.getFullYear(), previousMonth.getMonth() + 1, 0)

    const [thisMonthCountRow] = await db.query(
      `SELECT COUNT(*) as count FROM users WHERE created_at BETWEEN ? AND ?`,
      [firstDayThisMonth, lastDayThisMonth]
    )

    const [lastMonthCountRow] = await db.query(
      `SELECT COUNT(*) as count FROM users WHERE created_at BETWEEN ? AND ?`,
      [firstDayLastMonth, lastDayLastMonth]
    )

    const thisMonthCount = thisMonthCountRow[0]?.count || 0
    const lastMonthCount = lastMonthCountRow[0]?.count || 0

    const percentChange =
      lastMonthCount === 0
        ? thisMonthCount > 0 ? 100 : 0
        : Math.round(((thisMonthCount - lastMonthCount) / lastMonthCount) * 100)

    return Response.json({
      thisMonthCount,
      lastMonthCount,
      percentChange,
    })
  } catch (err) {
    console.error('User growth API error:', err)
    return Response.json({ error: 'Internal server error' }, { status: 500 })
  }
}
