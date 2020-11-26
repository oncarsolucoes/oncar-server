import { Request, Response } from 'express';
import Payers from '../models/Payers';
import PayerAccount from "../models/PayerAccount";
import { getRepository } from 'typeorm';

import apiTechno from '../services/apiTechno';
export default {
  async createPayer(request: Request, response: Response) {
    try {
			const payerRepository = getRepository(Payers);
			const payerAccountRepository = getRepository(PayerAccount);

			const data = await request.body;

			const res = await apiTechno.post('/payer', data, {
				headers: {
					cnpjSh: process.env.TECHNOSPEED_CNPJ,
					tokenSh: process.env.TECTECHNOSPEED_TOKEN,
					payercpfcnpj: data.cpfCnpj,
			}
			});

			if (res.data) {
				const {
					name,
					cpfCnpj,
					street,
					neighborhood,
					addressNumber,
					city,
					state,
					zipcode,
					token,
					accounts
				} = res.data;
				try {

					const payer = payerRepository.create({
            name,
            cpfCnpj,
            street,
						neighborhood,
						addressNumber,
            city,
            state,
            zipcode,
            token,
					});

					await payerRepository.save(payer)
					let payerAccountResult: (PayerAccount & PayerAccount[])[] = [];

					accounts.map((acc: { bankCode: any; agency: any; agencyDigit: any; accountNumber: any; accountNumberDigit: any; accountDac: any; convenioNumber: any; remessaSequential: any; }) => {
						const payerAccount = payerAccountRepository.create({
							payer_id: payer.id,
              bankCode: acc.bankCode,
              agency: acc.agency,
              agencyDigit: acc.agencyDigit,
              accountNumber: acc.accountNumber,
              accountNumberDigit: acc.accountNumberDigit,
              accountDac: acc.accountDac,
              convenioNumber: acc.convenioNumber,
              remessaSequential: acc.remessaSequential,
						});
						payerAccountRepository.save(payerAccount);
						payerAccountResult.push(payerAccount);
					})

					return response.json({ oncar: payer, payerAccountResult, technoSpeed: res.data  });
				} catch (err) {
					console.log(err);
					return response.status(500).json({error: 'Falha ao sincronizar dados com o banco. Tente novamente.'})
				}
			}
  	} catch (err) {
			console.log(err.response ? err.response.data.errors : err);
      return response.status(err.response.data.code).json({
				error: err.response.data.message,
				errorDetails: err.response.data.errors ? err.response.data.errors : 'Nenhum detalhe disponivel'
      });
  	}
	},

	 async verifyPayer(request: Request, response: Response) {
		 try {
			 const { cpfCnpj } = request.query;

			 const payerRepository = getRepository(Payers);
			 const payer = await payerRepository.findOne({ cpfCnpj: cpfCnpj?.toString() });

			 const res = await apiTechno.get('/payer',
				 	{
						headers: {
						cnpjSh: process.env.TECHNOSPEED_CNPJ,
						tokenSh: process.env.TECTECHNOSPEED_TOKEN,
						payercpfcnpj: cpfCnpj,
					}
				});
			return response.status(200).json({
				oncar: payer,
				technoSpeed: res.data
			});
		 } catch (err) {
			 const { cpfCnpj } = await request.query;

			 const payerRepository = getRepository(Payers);
       const payer = await payerRepository.findOne({
         cpfCnpj: cpfCnpj?.toString(),
       });
     	console.log(err.response ? err.response : err);
     	return response
        .status(payer != undefined ? 200 : err.response.data.code)
        .json({
          technoSpeed: err.response.data.message,
          oncar: payer != undefined ? payer : "Pagador não encontrado",
        });
   	}
   }
};
