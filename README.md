# H2M Imobiliária

Site completo e sofisticado para a H2M Imobiliária, com sistema de gerenciamento de imóveis e painel administrativo.

## Funcionalidades

### Site Público
- **Homepage**: Hero section, imóveis em destaque, seção de benefícios e CTAs
- **Listagem de Imóveis**: Filtros por tipo de transação (venda/locação) e categoria
- **Detalhes do Imóvel**: Página completa com todas as informações e galeria
- **Sobre**: História da empresa e valores
- **Contato**: Formulário e informações de contato

### Painel Administrativo
- **Login Seguro**: Autenticação com Supabase Auth
- **Gerenciar Imóveis**: Adicionar, editar e remover imóveis
- **Dashboard**: Visualização de todos os imóveis cadastrados
- **Proteção de Rotas**: Middleware para proteger páginas administrativas

## Tecnologias

- **Next.js 16**: Framework React com App Router
- **Supabase**: Banco de dados PostgreSQL e autenticação
- **Tailwind CSS v4**: Estilização moderna e responsiva
- **shadcn/ui**: Componentes de UI acessíveis e customizáveis
- **TypeScript**: Tipagem estática para maior segurança

## Configuração

### 1. Executar Scripts do Banco de Dados

Execute os scripts SQL na ordem:
1. `scripts/001_create_properties_table.sql` - Cria a tabela de imóveis
2. `scripts/002_seed_sample_properties.sql` - Adiciona imóveis de exemplo

### 2. Criar Usuário Administrativo

No painel do Supabase:
1. Vá em **Authentication > Users**
2. Clique em **Add user**
3. Email: `admin@h2m.com.br` (ou outro de sua escolha)
4. Senha: crie uma senha forte
5. Este usuário terá acesso ao painel `/admin`

### 3. Variáveis de Ambiente

As seguintes variáveis já estão configuradas no projeto:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## Como Usar

### Acessar o Site
- Homepage: `/`
- Ver imóveis: `/imoveis`
- Sobre: `/sobre`
- Contato: `/contato`

### Acessar o Admin
1. Acesse: `/admin`
2. Será redirecionado para `/admin/login`
3. Entre com as credenciais criadas
4. Gerencie os imóveis pelo painel

### Adicionar Imóveis
1. No painel admin, clique em "Adicionar Imóvel"
2. Preencha todos os campos obrigatórios
3. Marque "Imóvel em destaque" para aparecer na homepage
4. Clique em "Adicionar Imóvel"

## Design

O site segue a identidade visual da H2M com:
- Cores: Verde (#718878, #244235), Off-white (#F3F8F4), Preto (#111A17)
- Typography: Geist Sans (corpo), Playfair Display (títulos)
- Design clean, sofisticado e moderno
- Totalmente responsivo

## Segurança

- Row Level Security (RLS) habilitado
- Autenticação via Supabase Auth
- Middleware protegendo rotas administrativas
- Apenas usuários autenticados podem gerenciar imóveis
