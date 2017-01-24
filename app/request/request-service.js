const AbstractService = require('../store').AbstractService
const Request = require('./request')
const Rx = require('rx')

class RequestService extends AbstractService {

  constructor() {
    super(Request)
  }

  /**
   * @returns {Observable<Object>}
   */
  createNewInstance(data) {
    return Rx.Observable.return(new Request(data));
  }

  filter(params, projection, options, user) {
    let self = this
    let skip = Number.parseInt(params.skip != null ? params.skip : 0)
    let limit = Number.parseInt(params.limit != null ? params.limit : 10)
    let sortField = params.sortField ? params.sortField : 'creationDate'
    let sortType = params.sortType ? params.sortType : 'desc' //asc
    let sort = {}
    sort[sortField] = sortType;

    delete params.skip
    delete params.limit
    delete params.sortField
    delete params.sortType

    if (params.departure) {
      params['points.name'] = new RegExp(params.departure, 'i')
      //params['points.order'] = { "$lt": {  }} 
      delete params.departure
    }

    if (params.destination) {
      params['points.name'] = new RegExp(params.destination, 'i')
      params['points.order'] = {
        "$gt": 0
      }
      delete params.destination
    }

    if (params.departureDate) {
      let date = new Date(params.departureDate)
      let newdate = new Date(params.departureDate)
      newdate.setDate(newdate.getDate() + 1)

      params['points.departureDatetime'] = {
        "$gte": date.toISOString(),
        "$lte": newdate.toISOString()
      }
      delete params.departureDate
    }

    if (params.destinationDate) {
      let date = new Date(params.destinationDate)
      let newdate = new Date(params.destinationDate)
      newdate.setDate(newdate.getDate() + 1)

      params['points.arrivalDatetime'] = {
        "$gte": date.toISOString(),
        "$lte": newdate.toISOString()
      }

      delete params.destinationDate
    }

    return Rx.Observable.create(observer => {
      self.clazz
        .find(params, projection)
        .populate('user')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec((err, rqst) => {
          if (err) {
            observer.onError(err)
          } else {
            self.clazz.count(params)
              .exec((err, count) => {
                if (err) {
                  observer.onError(err)
                } else {
                  observer.onNext({data: rqst, count: count})
                  observer.onCompleted()
                }
              })
          }
        });
    });
  }

  findById(id) {
    let self = this
    let options = {}
    let source = Rx.Observable.fromNodeCallback(this.clazz.findById, this.clazz)
    return Rx.Observable.create(observer => {
      self.clazz
        .findById(id)
        .populate('user')
        .exec((err, msg) => {
          if (err) {
            observer.onError(err)
          } else {
            observer.onNext(msg)
            observer.onCompleted()
          }
        });
    });
  }

}

module.exports = new RequestService()