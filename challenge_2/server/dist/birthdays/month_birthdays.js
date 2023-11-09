import * as fs from 'fs';
import * as schedule from 'node-schedule';
const handleMonthBirthdays = (current_month) => {
    //Leitura e filtragem dos aniversariantes; Criação do novo arquivo dos aniversariantes do mês:
    const file_path = './src/birthdays';
    const all_birthdays_data = fs.readFileSync(`${file_path}/all_birthdays.txt`, 'utf-8');
    console.log("Mês atual: ", current_month);
    const all_bithdays = all_birthdays_data.split('\n');
    const current_month_birthdays = all_bithdays.filter(birthday => {
        const [full_name, email, birth_date] = birthday.split('|');
        const birth_month = new Date(birth_date).getMonth() + 1;
        return birth_month === current_month;
    });
    const current_year = new Date().getFullYear();
    const new_file_name = `${current_month}_${current_year}_birthdays.txt`;
    //Criação do novo arquivo txt: 
    const new_path = `${file_path}/month_birthdays/`;
    fs.writeFile(`${new_path}${new_file_name}`, current_month_birthdays.join('\n'), (err) => {
        if (err) {
            console.log("Houve algum erro");
        }
        console.log(`Arquivo ${new_file_name} gerado com os aniversariantes do mês!`);
    });
};
const scheduleMonth = () => {
    //Agendamento contínuo para executar a criação de novo arquivo com os aniversariantes a cada mês:
    schedule.scheduleJob('0 0 1 * *', () => {
        const schedule_month = new Date().getMonth() + 1;
        console.log("Schedule Month: ", schedule_month);
        handleMonthBirthdays(schedule_month);
    });
    console.log("Função para criação do arquivo contendo aniversariantes de cada mês agendado com sucesso.");
};
export const monthBirthdaysSystem = () => {
    //Sistema para criação de arquivos contendo os aniversariantes do mês:
    console.log("Executar a adição do novo arquivo!");
    scheduleMonth();
};
//# sourceMappingURL=month_birthdays.js.map