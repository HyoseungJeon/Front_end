class License{
    constructor(licenseId, kind, division, getDate){
        this.licenseId = licenseId;
        this.kind = kind;
        this.score = 0;
        this.division = division;
        this.getDate = getDate;
    }
}

export default License