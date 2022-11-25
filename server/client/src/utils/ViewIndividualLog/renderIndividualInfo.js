export const RenderIndividualInfo = () => {
  <div className="col">
    <div className="row">
      <div className="col view-individual-log-main">
        {individualLogValues.address}
      </div>
    </div>
    <div className="row">
      <div className="col view-individual-log-main">
        Created by: {individualLogValues.log_created_by}
      </div>
    </div>
  </div>
}