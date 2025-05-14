export interface Program {
    program_id:number;
    institution_id:number;
    program_name:string;
    description:string;
    activities:string;
    supervisor_name:string;
    supervisor_phone:string;
    supervisor_email:string;
}

export interface ProgramResponse {
    message:string;
    data:Program;
}

export interface ProgramsPaginated {
    items:Program[];
    limit:number;
    page:number;
    pages:number;
    total:number;
}
