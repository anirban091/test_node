const _userView = require('../db_schema/viewSchema')
const moment = require('moment');

module.exports = {

    allUserViews: async (req, res) => {
        try {
            let dailyData
            switch (req.body.viewType) {
                case 'daily':
                    dailyData = await _userView.countDocuments({
                        productId: req.body.productId,
                        viewDate: { $gte: moment().startOf('day') }
                    })

                    break;
                case 'weekly':
                    dailyData = await _userView.countDocuments({
                        productId: req.body.productId,
                        viewDate: { $gte: moment().startOf('week') }
                    })

                    break;
                case 'monthly':
                    dailyData = await _userView.countDocuments({
                        productId: req.body.productId,
                        viewDate: { $gte: moment().startOf('month') }
                    })

                    break;
                case 'custom':
                    if (!req.body.startDate || !req.body.endDate)
                        return res.status(400).send("Required field missing.")
                    dailyData = await _userView.countDocuments({
                        productId: req.body.productId,
                        viewDate: {
                            $gte: moment.utc(req.body.startDate),
                            $lte: moment.utc(req.body.endDate)
                        }
                    })

                    break;
                default:
                    return res.status(400).send("Choose Valid View Type.")
            }
            return res.status(200).send({ userViewCount: dailyData })

        } catch (error) {
            return res.status(400).send(error)
        }
    },


    uniqueUserView: async (req, res) => {
        try {
            let dailyData
            switch (req.body.viewType) {
                case 'daily':
                    dailyData = await _userView.distinct('userId', {
                        productId: req.body.productId,
                        viewDate: { $gte: moment().startOf('day') }
                    })

                    break;
                case 'weekly':
                    dailyData = await _userView.distinct('userId', {
                        productId: req.body.productId,
                        viewDate: { $gte: moment().startOf('week') }
                    })

                    break;
                case 'monthly':
                    dailyData = await _userView.distinct('userId', {
                        productId: req.body.productId,
                        viewDate: { $gte: moment().startOf('month') }
                    })

                    break;
                case 'custom':
                    if (!req.body.startDate || !req.body.endDate)
                        return res.status(400).send("Required field missing.")
                    dailyData = await _userView.distinct('userId', {
                        productId: req.body.productId,
                        viewDate: {
                            $gte: moment.utc(req.body.startDate),
                            $lte: moment.utc(req.body.endDate)
                        }
                    })

                    break;
                default:
                    return res.status(400).send("Choose Valid View Type.")
            }
            return res.status(200).send({ userViewCount: dailyData.length })

        } catch (error) {
            return res.status(400).send(error)
        }
    }
}