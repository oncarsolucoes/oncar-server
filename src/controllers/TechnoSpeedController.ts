import { Request, Response } from 'express';
import Payers from '../models/Payers';
import { getRepository } from 'typeorm';

import apiTechno from '../services/apiTechno';
export default {
  async createPayer(request: Request, response: Response) {
    try {
			const payerRepository = getRepository(Payers);
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

					await payerRepository.save(payer);
				} catch (err) {
					console.log(err);
					return response.status(500).json({error: 'Falha ao sincronizar dados com o banco. Tente novamente.'})
				}
			}
    return response.status(201).json(res.data);
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
			 const { cpfCnpj } = await request.query;

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
     	return response.status(err.response.data.code).json({
					technoSpeed: err.response.data.message,
					oncar: payer
	 		});
   	}
   }
};
