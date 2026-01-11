# 🚀 Guia Completo: Deploy Node.js + Puppeteer no AWS EC2

## 📋 Pré-requisitos
- ✅ Conta de e-mail válida
- ✅ Cartão de crédito (para validação, não será cobrado no free tier)
- ✅ ~2-4 horas para configuração inicial
- ✅ Seu código já está pronto na pasta `server/`

---

## 📝 PARTE 1: Criar Conta AWS (15-20 minutos)

### Passo 1.1: Registro
1. Acesse: https://portal.aws.amazon.com/billing/signup
2. Clique em **"Create a new AWS account"**
3. Preencha:
   - **Email**: seu e-mail principal
   - **Password**: senha forte (guarde bem!)
   - **AWS account name**: `meu-curriculo-generator` (ou outro nome)
4. Clique **"Continue"**

### Passo 1.2: Informações de Contato
1. Selecione **"Personal"** (conta pessoal)
2. Preencha:
   - Nome completo
   - Telefone (receberá SMS de verificação)
   - Endereço completo
3. Aceite os termos
4. Clique **"Continue"**

### Passo 1.3: Informações de Pagamento
1. Insira dados do cartão de crédito
   - ⚠️ **AWS cobra $1 para verificação** (é devolvido)
   - ⚠️ **Free Tier é grátis por 12 meses** se ficar dentro dos limites
2. Clique **"Verify and Continue"**

### Passo 1.4: Verificação de Identidade
1. Escolha **SMS** ou **Voice call**
2. Receberá código de 4 dígitos
3. Insira o código
4. Clique **"Continue"**

### Passo 1.5: Escolher Plano
1. Selecione **"Basic Support - Free"**
2. Clique **"Complete sign up"**
3. ✅ **Conta criada!** Aguarde 5-10 minutos para ativação

---

## 🖥️ PARTE 2: Criar Instância EC2 (20-30 minutos)

### Passo 2.1: Acessar Console AWS
1. Acesse: https://console.aws.amazon.com/
2. Faça login com seu e-mail e senha
3. Na barra de busca superior, digite: **EC2**
4. Clique em **"EC2"** (Virtual Servers in the Cloud)

### Passo 2.2: Lançar Instância
1. No Dashboard do EC2, clique no botão laranja **"Launch Instance"**
2. Você verá a tela de configuração

### Passo 2.3: Configurar Nome
1. **Name**: `curriculo-pdf-server`
2. **Tags**: Deixe como está

### Passo 2.4: Escolher Sistema Operacional
1. **Application and OS Images (Amazon Machine Image)**
2. Selecione: **Ubuntu**
3. Escolha: **Ubuntu Server 24.04 LTS (HVM), SSD Volume Type**
4. ✅ Verifique se tem a etiqueta **"Free tier eligible"**

### Passo 2.5: Escolher Tipo de Instância
1. **Instance type**: Selecione **t2.micro**
2. ✅ Deve mostrar: "Free tier eligible"
3. Configuração:
   - **1 vCPU** (processador virtual)
   - **1 GB RAM**
   - Suficiente para Puppeteer com poucos acessos simultâneos

### Passo 2.6: Configurar Acesso (Key Pair)
1. Em **Key pair (login)**, clique **"Create new key pair"**
2. Preencha:
   - **Key pair name**: `curriculo-server-key`
   - **Key pair type**: **RSA**
   - **Private key file format**: 
     - Windows: **.ppk** (para PuTTY)
     - Mac/Linux: **.pem**
3. Clique **"Create key pair"**
4. ⚠️ **Arquivo será baixado automaticamente** - GUARDE BEM! Não pode recuperar depois
5. ⚠️ Mas para este tutorial, usaremos **EC2 Instance Connect** (navegador), então não precisará do arquivo agora

### Passo 2.7: Configurar Network Settings (IMPORTANTE!)
1. Clique em **"Edit"** na seção **Network settings**
2. Deixe:
   - **VPC**: default
   - **Subnet**: No preference
   - **Auto-assign public IP**: **Enable**
3. **Firewall (Security Groups)**: Clique **"Create security group"**
4. **Security group name**: `curriculo-pdf-sg`
5. **Description**: `Permite acesso HTTP e Node.js`
6. Configure as regras:

   **Regra 1 - SSH** (já vem configurada):
   - Type: SSH
   - Port: 22
   - Source: Anywhere (0.0.0.0/0)

   **Regra 2 - HTTP** (clique "Add security group rule"):
   - Type: HTTP
   - Port: 80
   - Source: Anywhere (0.0.0.0/0)

   **Regra 3 - Custom TCP** (clique "Add security group rule"):
   - Type: Custom TCP
   - Port: **3000**
   - Source: Anywhere (0.0.0.0/0)
   - ℹ️ Porta que seu servidor Node.js usará

### Passo 2.8: Configurar Storage
1. **Configure storage**:
   - **Size**: **8 GB** (padrão, suficiente)
   - **Volume type**: gp3
   - ✅ Free tier: até 30 GB grátis
2. Deixe outras opções como estão

### Passo 2.9: Review e Launch
1. No lado direito, veja o **Summary**:
   - **Number of instances**: 1
   - **Free tier**: ✅ Deve estar dentro do free tier
2. Clique no botão laranja **"Launch instance"**
3. ✅ Verá mensagem de sucesso!
4. Clique em **"View all instances"**

### Passo 2.10: Aguardar Inicialização
1. Você verá sua instância na lista
2. **Status**: Aguarde mudar de `Pending` para `Running` (1-2 minutos)
3. **Status check**: Aguarde `2/2 checks passed`
4. Anote ou copie o **Public IPv4 address** (ex: `18.123.45.67`)
   - ℹ️ Este será o endereço do seu servidor!

---

## 🔌 PARTE 3: Conectar ao Servidor (5 minutos)

### Passo 3.1: Abrir Console
1. Selecione sua instância (checkbox)
2. Clique no botão **"Connect"** (topo da página)
3. Escolha a aba **"EC2 Instance Connect"**
4. **User name**: deve estar `ubuntu` (padrão)
5. Clique no botão laranja **"Connect"**
6. ✅ Abrirá uma nova aba com terminal Linux preto!

### Passo 3.2: Verificar Conexão
No terminal, você verá algo como:
```
ubuntu@ip-172-31-xx-xx:~$
```
✅ Você está conectado ao servidor Ubuntu!

---

## ⚙️ PARTE 4: Instalar Dependências (15-20 minutos)

### Passo 4.1: Atualizar Sistema
Cole no terminal e pressione Enter:
```bash
sudo apt update && sudo apt upgrade -y
```
⏱️ Aguarde 2-5 minutos (instalará atualizações)

### Passo 4.2: Instalar Node.js
```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
```
⏱️ Aguarde 1-2 minutos

Verificar instalação:
```bash
node --version
npm --version
```
✅ Deve mostrar: `v20.x.x` e `10.x.x`

### Passo 4.3: Instalar Git
```bash
sudo apt install git -y
```

### Passo 4.4: Instalar Dependências do Puppeteer
Puppeteer precisa de várias bibliotecas do sistema:
```bash
sudo apt-get install -y \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libc6 \
    libcairo2 \
    libcups2 \
    libdbus-1-3 \
    libexpat1 \
    libfontconfig1 \
    libgbm1 \
    libgcc1 \
    libglib2.0-0 \
    libgtk-3-0 \
    libnspr4 \
    libnss3 \
    libpango-1.0-0 \
    libpangocairo-1.0-0 \
    libstdc++6 \
    libx11-6 \
    libx11-xcb1 \
    libxcb1 \
    libxcomposite1 \
    libxcursor1 \
    libxdamage1 \
    libxext6 \
    libxfixes3 \
    libxi6 \
    libxrandr2 \
    libxrender1 \
    libxss1 \
    libxtst6 \
    lsb-release \
    wget \
    xdg-utils
```
⏱️ Aguarde 3-5 minutos

---

## 📦 PARTE 5: Deploy do Código (10-15 minutos)

### Passo 5.1: Criar Repositório no GitHub (se ainda não tiver)

**Opção A: Seu código já está no GitHub**
- Pule para Passo 5.2

**Opção B: Colocar pasta server/ no GitHub**

No seu computador local (VS Code terminal):
```powershell
cd "C:\Users\Juan\Documents\Projetos\Projeto Curriculum"
git add server/
git commit -m "feat: adiciona servidor Node.js para AWS EC2"
git push origin dev-staging
```

**Opção C: Criar repositório separado para o servidor**
1. No GitHub, crie novo repositório: `curriculo-pdf-server`
2. No seu computador:
```powershell
cd "C:\Users\Juan\Documents\Projetos\Projeto Curriculum\server"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/curriculo-pdf-server.git
git push -u origin main
```

### Passo 5.2: Clonar Código no EC2

No terminal do EC2:
```bash
cd ~
git clone https://github.com/SEU-USUARIO/curriculo-pdf-server.git
# OU se estiver no repositório principal:
# git clone https://github.com/SEU-USUARIO/NOME-REPO.git
```

### Passo 5.3: Navegar e Instalar
```bash
cd curriculo-pdf-server
# OU se clonou repo principal:
# cd NOME-REPO/server
```

Instalar dependências:
```bash
npm install
```
⏱️ Aguarde 5-10 minutos (Puppeteer baixa o Chromium ~300MB)

### Passo 5.4: Testar Servidor
```bash
npm start
```

✅ Deve ver:
```
Server rodando na porta 3000
```

### Passo 5.5: Testar no Navegador
1. Abra nova aba no navegador
2. Acesse: `http://SEU-IP-PUBLICO:3000`
   - Ex: `http://18.123.45.67:3000`
3. ✅ Deve ver mensagem ou endpoint funcionando!

No terminal EC2, pressione `Ctrl+C` para parar o servidor (vamos configurar para rodar permanentemente)

---

## 🔄 PARTE 6: Manter Servidor Rodando 24/7 (10 minutos)

### Passo 6.1: Instalar PM2
PM2 mantém o servidor rodando mesmo se você fechar o terminal:
```bash
sudo npm install -g pm2
```

### Passo 6.2: Iniciar com PM2
```bash
pm2 start server.js --name curriculo-pdf
# OU se seu arquivo principal for index.js:
# pm2 start index.js --name curriculo-pdf
```

### Passo 6.3: Configurar Inicialização Automática
Se o servidor reiniciar, PM2 reinicia seu app automaticamente:
```bash
pm2 startup
```
Copie e execute o comando que aparecer (começa com `sudo env...`)

Depois:
```bash
pm2 save
```

### Passo 6.4: Verificar Status
```bash
pm2 status
pm2 logs curriculo-pdf
```
✅ Deve mostrar status `online`!

### Comandos PM2 Úteis:
```bash
pm2 stop curriculo-pdf      # Parar
pm2 restart curriculo-pdf   # Reiniciar
pm2 logs curriculo-pdf      # Ver logs em tempo real
pm2 delete curriculo-pdf    # Remover do PM2
```

---

## 🌐 PARTE 7: Conectar Frontend ao EC2 (5 minutos)

### Passo 7.1: Atualizar MainVue.vue

No seu computador, abra `src/views/MainVue.vue` e atualize a URL da API:

```javascript
async exportToPDF() {
  this.isGeneratingPDF = true
  try {
    // URL do seu servidor EC2
    const apiUrl = 'http://SEU-IP-PUBLICO:3000/api/generate-pdf'
    // Exemplo: 'http://18.123.45.67:3000/api/generate-pdf'
    
    // ... resto do código
  } catch (error) {
    console.error('Erro ao gerar PDF:', error)
  } finally {
    this.isGeneratingPDF = false
  }
}
```

### Passo 7.2: Fazer Deploy
```powershell
git add src/views/MainVue.vue
git commit -m "feat: conecta frontend ao servidor AWS EC2"
git push origin dev-staging
```

Vercel fará deploy automaticamente em 1-2 minutos.

### Passo 7.3: Testar!
1. Acesse seu site no Vercel
2. Preencha um currículo
3. Clique em **"Baixar PDF"**
4. ✅ Deve fazer download do PDF!

---

## 🎯 PARTE 8: Configuração Opcional - Domínio Próprio

### Se quiser usar um domínio ao invés do IP:

**Opção 1: Usar Elastic IP (grátis no free tier)**
1. No Console EC2, menu lateral: **Elastic IPs**
2. **Allocate Elastic IP address**
3. Associe à sua instância
4. ✅ IP não muda mais mesmo se reiniciar o servidor

**Opção 2: Configurar domínio próprio**
1. Compre domínio (ex: Registro.br ~R$40/ano)
2. No painel do domínio, adicione registro DNS:
   - Type: **A**
   - Host: **api** (ou @)
   - Value: **Seu IP do EC2**
   - TTL: 3600
3. Acesse via: `http://api.seudominio.com.br:3000`

**Opção 3: Configurar Caddy (Reverse Proxy + HTTPS)**
No EC2:
```bash
sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
sudo apt update
sudo apt install caddy
```

Editar configuração:
```bash
sudo nano /etc/caddy/Caddyfile
```

Adicione:
```
api.seudominio.com.br {
    reverse_proxy localhost:3000
}
```

Reiniciar Caddy:
```bash
sudo systemctl restart caddy
```

Atualizar Security Group: remova porta 3000, mantenha só porta 80 e 443 (HTTPS)

✅ Acesse via: `https://api.seudominio.com.br` (com HTTPS automático!)

---

## 📊 PARTE 9: Monitorar Custos e Free Tier

### Passo 9.1: Configurar Alertas de Cobrança
1. No Console AWS, clique no seu nome (canto superior direito)
2. **Billing and Cost Management**
3. **Billing preferences**
4. Marque: **Receive Free Tier Usage Alerts**
5. Insira e-mail
6. **Save preferences**

### Passo 9.2: Verificar Uso do Free Tier
1. **Billing Dashboard** > **Free Tier**
2. Veja uso de:
   - **EC2 Running Hours**: 750h/mês grátis (t2.micro)
   - **EC2 Data Transfer**: 15 GB saída grátis/mês
   - **EBS Storage**: 30 GB grátis/mês

### Limites para NÃO ser cobrado:
- ✅ Manter 1 instância t2.micro rodando 24/7: **GRÁTIS**
- ✅ Até 15 GB de transferência OUT por mês: **GRÁTIS**
- ⚠️ Se criar outra instância: **SERÁ COBRADO**
- ⚠️ Se mudar para t2.small ou maior: **SERÁ COBRADO**
- ⚠️ Após 12 meses: **~R$40-50/mês**

---

## 🔧 Comandos de Manutenção

### No EC2, via EC2 Instance Connect:

**Ver logs do servidor:**
```bash
pm2 logs curriculo-pdf
```

**Atualizar código (quando fizer mudanças):**
```bash
cd ~/curriculo-pdf-server  # ou ~/NOME-REPO/server
git pull origin main
npm install  # se mudou dependências
pm2 restart curriculo-pdf
```

**Ver uso de memória/CPU:**
```bash
pm2 monit
htop  # instale com: sudo apt install htop
```

**Verificar espaço em disco:**
```bash
df -h
```

**Ver logs do sistema:**
```bash
sudo journalctl -u pm2-ubuntu -f
```

---

## 🐛 Troubleshooting

### Problema: "Cannot connect to EC2 instance"
- ✅ Verifique Security Group tem porta 3000 aberta
- ✅ Verifique servidor está rodando: `pm2 status`
- ✅ Teste localmente no EC2: `curl http://localhost:3000`

### Problema: "Puppeteer error launching Chrome"
```bash
# Reinstalar dependências do Puppeteer
cd ~/curriculo-pdf-server
npm rebuild puppeteer
```

### Problema: "Out of memory"
- t2.micro tem só 1GB RAM
- Puppeteer usa ~200-300MB por PDF
- Limite requisições simultâneas no código
- OU upgrade para t2.small (~R$20/mês depois do free tier)

### Problema: "Instance stopped"
- No Console EC2, selecione a instância
- **Actions** > **Instance State** > **Start instance**

### Problema: "Connection timeout"
- Verifique IP público não mudou (use Elastic IP)
- Ping no IP: `ping SEU-IP-PUBLICO`
- Teste SSH: na sua máquina `ssh -i curriculo-server-key.pem ubuntu@SEU-IP-PUBLICO`

---

## ✅ Checklist Final

- [ ] Conta AWS criada com free tier
- [ ] Instância EC2 t2.micro rodando
- [ ] Security Group com portas 22, 80, 3000 abertas
- [ ] Node.js v20+ instalado
- [ ] Dependências do Puppeteer instaladas
- [ ] Código clonado do GitHub
- [ ] npm install completo
- [ ] PM2 rodando o servidor
- [ ] Servidor acessível em `http://IP:3000`
- [ ] Frontend atualizado com URL do EC2
- [ ] PDF download funcionando!
- [ ] Alerta de cobrança configurado

---

## 📚 Recursos Adicionais

**Documentação Oficial:**
- AWS EC2: https://docs.aws.amazon.com/ec2/
- PM2: https://pm2.keymetrics.io/docs/usage/quick-start/
- Puppeteer: https://pptr.dev/

**Tutoriais em Português:**
- AWS Free Tier: https://aws.amazon.com/pt/free/
- EC2 Tutorial: https://www.youtube.com/results?search_query=aws+ec2+tutorial+português

---

## 💰 Depois dos 12 Meses

Quando o free tier acabar, você tem opções:

1. **Continuar pagando** (~R$40-50/mês)
2. **Migrar para Render/Railway** (preço similar)
3. **Voltar para window.print()** (grátis sempre)
4. **Criar nova conta AWS** com outro e-mail (não recomendado por AWS TOS)

---

## 🎓 O que Você Aprendeu (para o currículo!)

✅ **Cloud Computing**: Deploy de aplicação em AWS EC2  
✅ **Linux/Ubuntu**: Comandos terminal, gerenciamento de pacotes  
✅ **DevOps**: PM2 para process management, monitoramento  
✅ **Networking**: Security groups, inbound rules, portas  
✅ **Node.js**: Deploy de servidor Express em produção  
✅ **Git**: Clone de repositórios em servidor remoto  
✅ **Puppeteer**: Instalação e configuração em ambiente Linux  
✅ **System Administration**: Manutenção e troubleshooting de servidor  

**No currículo:**
> "Implementei solução de geração de PDFs com Puppeteer hospedada em AWS EC2, 
> gerenciando infraestrutura Linux, configuração de networking, e deployment 
> com PM2 para alta disponibilidade."

---

## 🤝 Precisa de Ajuda?

Se travar em alguma etapa, me mande:
1. Qual parte do tutorial você está
2. Mensagem de erro exata (screenshot ou texto)
3. Output do comando que deu erro

Vamos resolver juntos! 💪

---

**Boa sorte com o deploy! Você consegue! 🚀**
